import {
  BigQuery,
  type BigQueryOptions,
  type Query,
  type QueryRowsResponse,
} from '@google-cloud/bigquery';
import type bigquery from '@google-cloud/bigquery/build/src/types';
import type { DataSourceIntrospector } from '../introspection/base';
import { BigQueryIntrospector } from '../introspection/bigquery';
import { type BigQueryCredentials, type Credentials, DataSourceType } from '../types/credentials';
import type { QueryParameter } from '../types/query';
import { type AdapterQueryResult, BaseAdapter, type FieldMetadata } from './base';
import { fixBigQueryTableReferences } from './helpers/bigquery-sql-fixer';
import { normalizeRowValues } from './helpers/normalize-values';
import { getBigQuerySimpleType, mapBigQueryType } from './type-mappings/bigquery';

/**
 * BigQuery database adapter
 */
export class BigQueryAdapter extends BaseAdapter {
  private client?: BigQuery | undefined;
  private introspector?: BigQueryIntrospector;

  async initialize(credentials: Credentials): Promise<void> {
    this.validateCredentials(credentials, DataSourceType.BigQuery);
    const bigqueryCredentials = credentials as BigQueryCredentials;

    try {
      const options: BigQueryOptions = {
        projectId: bigqueryCredentials.project_id,
      };

      // Handle service account authentication
      if (bigqueryCredentials.service_account_key) {
        // Check if it's already an object
        if (typeof bigqueryCredentials.service_account_key === 'object') {
          options.credentials = bigqueryCredentials.service_account_key;
        } else if (typeof bigqueryCredentials.service_account_key === 'string') {
          try {
            // Try to parse as JSON string
            const keyData = JSON.parse(bigqueryCredentials.service_account_key);
            options.credentials = keyData;
          } catch {
            // If parsing fails, treat as file path
            options.keyFilename = bigqueryCredentials.service_account_key;
          }
        }
      } else if (bigqueryCredentials.key_file_path) {
        options.keyFilename = bigqueryCredentials.key_file_path;
      }

      if (bigqueryCredentials.location) {
        options.location = bigqueryCredentials.location;
      }

      this.client = new BigQuery(options);
      this.credentials = credentials;
      this.connected = true;
    } catch (error) {
      throw new Error(
        `Failed to initialize BigQuery client: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async query(
    sql: string,
    params?: QueryParameter[],
    maxRows?: number,
    timeout?: number
  ): Promise<AdapterQueryResult> {
    this.ensureConnected();

    if (!this.client) {
      throw new Error('BigQuery client not initialized');
    }

    try {
      // Fix SQL to ensure proper escaping of identifiers with special characters
      const fixedSql = fixBigQueryTableReferences(sql);

      const options: Query = {
        query: fixedSql,
        useLegacySql: false,
      };

      // Add timeout if specified (default: 60 seconds)
      if (timeout || timeout === 0) {
        options.jobTimeoutMs = timeout;
      } else {
        options.jobTimeoutMs = 60000; // 60 second default for analytical queries
      }

      // Apply row limit if specified
      let hasMoreRows = false;
      if (maxRows && maxRows > 0) {
        // BigQuery supports maxResults natively
        options.maxResults = maxRows + 1;
      }

      // Handle parameterized queries - BigQuery uses named parameters
      if (params && params.length > 0) {
        // Convert positional parameters to named parameters
        let processedSql = fixedSql;
        const namedParams: Record<string, QueryParameter> = {};

        // Replace ? placeholders with @param0, @param1, etc.
        let paramIndex = 0;
        processedSql = fixedSql.replace(/\?/g, () => {
          const paramName = `param${paramIndex}`;
          const paramValue = params[paramIndex];
          if (paramValue !== undefined) {
            namedParams[paramName] = paramValue;
          }
          paramIndex++;
          return `@${paramName}`;
        });

        options.query = processedSql;
        options.params = namedParams;
      }

      const [job] = await this.client.createQueryJob(options);
      const queryResults: QueryRowsResponse = await job.getQueryResults();

      // QueryRowsResponse is [RowMetadata[]] or [RowMetadata[], Query | null, QueryResultsResponse]
      const rows = queryResults[0];

      // The third element contains the API response with schema when present
      // QueryResultsResponse is bigquery.IGetQueryResultsResponse | bigquery.IQueryResponse
      const apiResponse = queryResults.length > 2 ? queryResults[2] : null;

      // Convert BigQuery rows to plain objects and normalize values
      let resultRows: Record<string, unknown>[] = rows.map((row) => normalizeRowValues({ ...row }));

      // Check if we have more rows than requested
      if (maxRows && resultRows.length > maxRows) {
        hasMoreRows = true;
        // Remove the extra row we fetched to check for more
        resultRows = resultRows.slice(0, maxRows);
      }

      // Extract field metadata from BigQuery schema
      const fields: FieldMetadata[] = [];
      if (apiResponse && 'schema' in apiResponse && apiResponse.schema) {
        const tableSchema = apiResponse.schema as bigquery.ITableSchema;
        if (tableSchema.fields && Array.isArray(tableSchema.fields)) {
          for (const field of tableSchema.fields) {
            const normalizedType = mapBigQueryType(field.type || 'STRING');
            fields.push({
              name: field.name || '',
              type: normalizedType,
              nullable: field.mode !== 'REQUIRED',
              // BigQuery doesn't provide length/precision in standard schema
              length: 0,
              precision: 0,
            });
          }
        }
      }

      return {
        rows: resultRows,
        rowCount: resultRows.length,
        fields,
        hasMoreRows,
      };
    } catch (error) {
      throw new Error(
        `BigQuery query failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      if (!this.client) {
        return false;
      }

      // Test connection by running a simple query
      const [job] = await this.client.createQueryJob({
        query: 'SELECT 1 as test',
        useLegacySql: false,
      });

      await job.getQueryResults();
      return true;
    } catch {
      return false;
    }
  }

  async close(): Promise<void> {
    // BigQuery client doesn't require explicit closing
    this.connected = false;
    this.client = undefined;
  }

  getDataSourceType(): string {
    return DataSourceType.BigQuery;
  }

  introspect(): DataSourceIntrospector {
    this.ensureConnected();
    if (!this.introspector) {
      this.introspector = new BigQueryIntrospector('bigquery', this);
    }
    return this.introspector;
  }
}
