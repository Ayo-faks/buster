import { getUserOrganizationId } from '@buster/database';
import {
  InitiateOAuthSchema,
  OAuthCallbackSchema,
  SlackError,
  SlackErrorCodes,
  UpdateIntegrationSchema,
} from '@buster/server-shared/slack';
import { SlackChannelService } from '@buster/slack';
import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { getActiveIntegration, updateDefaultChannel } from './services/slack-helpers';
import * as slackHelpers from './services/slack-helpers';
import { type SlackOAuthService, createSlackOAuthService } from './services/slack-oauth-service';

export class SlackHandler {
  private slackOAuthService: SlackOAuthService | null = null;
  private _initializationAttempted = false;

  private getSlackOAuthService(): SlackOAuthService | null {
    if (!this._initializationAttempted) {
      this._initializationAttempted = true;
      try {
        this.slackOAuthService = createSlackOAuthService();
      } catch (error) {
        console.error('Failed to initialize SlackOAuthService:', error);
        this.slackOAuthService = null;
      }
    }
    return this.slackOAuthService;
  }

  /**
   * POST /api/v2/slack/auth/init
   * Initiate OAuth flow
   */
  async initiateOAuth(c: Context) {
    try {
      // Get service instance (lazy initialization)
      const slackOAuthService = this.getSlackOAuthService();

      // Check if service is available
      if (!slackOAuthService) {
        return c.json(
          {
            error: 'Slack integration is not configured',
            code: 'INTEGRATION_NOT_CONFIGURED',
          },
          503
        );
      }

      // Check if integration is enabled
      if (!slackOAuthService.isEnabled()) {
        return c.json(
          {
            error: 'Slack integration is not enabled',
            code: 'INTEGRATION_DISABLED',
          },
          503
        );
      }

      // Get authenticated user context
      const user = c.get('busterUser');

      if (!user) {
        throw new HTTPException(401, { message: 'Authentication required' });
      }

      const organizationGrant = await getUserOrganizationId(user.id);

      if (!organizationGrant) {
        throw new HTTPException(400, { message: 'Organization not found' });
      }

      // Parse request body
      const body = await c.req.json().catch(() => ({}));
      const parsed = InitiateOAuthSchema.safeParse(body);

      const metadata = parsed.success ? parsed.data.metadata : undefined;

      // Add IP address to metadata
      const enrichedMetadata = {
        ...metadata,
        ipAddress: c.req.header('x-forwarded-for') || c.req.header('x-real-ip'),
      };

      // Initiate OAuth flow
      const result = await slackOAuthService.initiateOAuth({
        organizationId: organizationGrant.organizationId,
        userId: user.id,
        metadata: enrichedMetadata,
      });

      return c.json(result);
    } catch (error) {
      console.error('Failed to initiate OAuth:', error);

      if (error instanceof HTTPException) {
        throw error;
      }

      if (error instanceof Error && error.message.includes('already has an active')) {
        throw new SlackError(
          'Organization already has an active Slack integration',
          409,
          'INTEGRATION_EXISTS'
        );
      }

      throw new SlackError(
        error instanceof Error ? error.message : 'Failed to initiate OAuth',
        500,
        'OAUTH_INIT_ERROR'
      );
    }
  }

  /**
   * GET /api/v2/slack/auth/callback
   * Handle OAuth callback from Slack
   */
  async handleOAuthCallback(c: Context) {
    try {
      // Get service instance (lazy initialization)
      const slackOAuthService = this.getSlackOAuthService();

      // Check if service is available
      if (!slackOAuthService) {
        return c.redirect('/settings/integrations?status=error&error=not_configured');
      }

      // Parse query parameters
      const query = c.req.query();
      console.info('OAuth callback received', {
        hasCode: !!query.code,
        hasState: !!query.state,
        hasError: !!query.error,
        paramCount: Object.keys(query).length,
      });
      const parsed = OAuthCallbackSchema.safeParse(query);

      if (!parsed.success) {
        // Handle user denial
        if (query.error === 'access_denied') {
          console.info('OAuth flow cancelled by user');
          return c.redirect('/settings/integrations?status=cancelled');
        }

        console.error('Invalid OAuth callback parameters:', {
          errors: parsed.error.errors,
          providedKeys: Object.keys(query),
          expectedKeys: ['code', 'state'],
        });
        return c.redirect('/settings/integrations?status=error&error=invalid_parameters');
      }

      // Handle OAuth callback
      console.info('Processing OAuth callback with service');
      const result = await slackOAuthService.handleOAuthCallback({
        code: parsed.data.code,
        state: parsed.data.state,
      });

      if (!result.success) {
        console.error('OAuth callback failed:', {
          error: result.error,
          hasError: !!result.error,
          resultKeys: Object.keys(result),
        });
        const errorParam = encodeURIComponent(result.error || 'unknown_error');
        return c.redirect(`/settings/integrations?status=error&error=${errorParam}`);
      }

      // Use metadata to determine return URL
      const returnUrl = result.metadata?.returnUrl || '/settings/integrations';
      const workspaceParam = result.teamName
        ? `&workspace=${encodeURIComponent(result.teamName)}`
        : '';

      return c.redirect(`${returnUrl}?status=success${workspaceParam}`);
    } catch (error) {
      console.error('OAuth callback error:', {
        errorType: error?.constructor?.name || 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        isSlackError: error instanceof SlackError,
        hasStack: !!(error instanceof Error && error.stack),
      });
      const errorMessage = error instanceof Error ? error.message : 'callback_failed';
      return c.redirect(
        `/settings/integrations?status=error&error=${encodeURIComponent(errorMessage)}`
      );
    }
  }

  /**
   * GET /api/v2/slack/integration
   * Get current integration status
   */
  async getIntegration(c: Context) {
    try {
      // Get service instance (lazy initialization)
      const slackOAuthService = this.getSlackOAuthService();

      // Check if service is available
      if (!slackOAuthService) {
        return c.json(
          {
            error: 'Slack integration is not configured',
            code: 'INTEGRATION_NOT_CONFIGURED',
          },
          503
        );
      }

      const busterUser = c.get('busterUser');

      if (!busterUser) {
        throw new HTTPException(401, { message: 'Authentication required' });
      }

      const organizationGrant = await getUserOrganizationId(busterUser.id);

      if (!organizationGrant) {
        throw new HTTPException(400, { message: 'Organization not found' });
      }

      const status = await slackOAuthService.getIntegrationStatus(organizationGrant.organizationId);

      return c.json(status);
    } catch (error) {
      console.error('Failed to get integration status:', error);

      if (error instanceof HTTPException) {
        throw error;
      }

      throw new SlackError(
        error instanceof Error ? error.message : 'Failed to get integration status',
        500,
        'GET_INTEGRATION_ERROR'
      );
    }
  }

  /**
   * DELETE /api/v2/slack/integration
   * Remove Slack integration
   */
  async removeIntegration(c: Context) {
    try {
      // Get service instance (lazy initialization)
      const slackOAuthService = this.getSlackOAuthService();

      // Check if service is available
      if (!slackOAuthService) {
        return c.json(
          {
            error: 'Slack integration is not configured',
            code: 'INTEGRATION_NOT_CONFIGURED',
          },
          503
        );
      }

      const user = c.get('busterUser');

      if (!user) {
        throw new HTTPException(401, { message: 'Authentication required' });
      }

      const organizationGrant = await getUserOrganizationId(user.id);

      if (!organizationGrant) {
        throw new HTTPException(400, { message: 'Organization not found' });
      }

      const result = await slackOAuthService.removeIntegration(
        organizationGrant.organizationId,
        user.id
      );

      if (!result.success) {
        throw new SlackError(
          result.error || 'Failed to remove integration',
          404,
          'INTEGRATION_NOT_FOUND'
        );
      }

      return c.json({
        message: 'Slack integration removed successfully',
      });
    } catch (error) {
      console.error('Failed to remove integration:', error);

      if (error instanceof HTTPException || error instanceof SlackError) {
        throw error;
      }

      throw new SlackError(
        error instanceof Error ? error.message : 'Failed to remove integration',
        500,
        'REMOVE_INTEGRATION_ERROR'
      );
    }
  }

  /**
   * PUT /api/v2/slack/integration
   * Update Slack integration settings
   */
  async updateIntegration(c: Context) {
    try {
      // Get service instance (lazy initialization)
      const slackOAuthService = this.getSlackOAuthService();

      // Check if service is available
      if (!slackOAuthService) {
        return c.json(
          {
            error: 'Slack integration is not configured',
            code: 'INTEGRATION_NOT_CONFIGURED',
          },
          503
        );
      }

      const user = c.get('busterUser');

      if (!user) {
        throw new HTTPException(401, { message: 'Authentication required' });
      }

      const organizationGrant = await getUserOrganizationId(user.id);

      if (!organizationGrant) {
        throw new HTTPException(400, { message: 'Organization not found' });
      }

      // Parse request body
      const body = await c.req.json().catch(() => ({}));
      const parsed = UpdateIntegrationSchema.safeParse(body);

      if (!parsed.success) {
        throw new SlackError(
          `Invalid request body: ${parsed.error.errors.map((e) => e.message).join(', ')}`,
          400,
          'INVALID_REQUEST_BODY'
        );
      }

      // Get active integration
      const integration = await getActiveIntegration(organizationGrant.organizationId);

      if (!integration) {
        throw new SlackError('No active Slack integration found', 404, 'INTEGRATION_NOT_FOUND');
      }

      // Update integration settings
      if (parsed.data.default_channel) {
        await updateDefaultChannel(integration.id, parsed.data.default_channel);
      }

      return c.json({
        message: 'Integration updated successfully',
        ...parsed.data,
      });
    } catch (error) {
      console.error('Failed to update default channel:', error);

      if (error instanceof HTTPException || error instanceof SlackError) {
        throw error;
      }

      throw new SlackError(
        error instanceof Error ? error.message : 'Failed to update default channel',
        500,
        'UPDATE_DEFAULT_CHANNEL_ERROR'
      );
    }
  }

  /**
   * GET /api/v2/slack/channels
   * Get public channels for the current integration
   */
  async getChannels(c: Context) {
    try {
      // Get service instance (lazy initialization)
      const slackOAuthService = this.getSlackOAuthService();

      // Check if service is available
      if (!slackOAuthService) {
        return c.json(
          {
            error: 'Slack integration is not configured',
            code: 'INTEGRATION_NOT_CONFIGURED',
          },
          503
        );
      }

      const busterUser = c.get('busterUser');

      if (!busterUser) {
        throw new HTTPException(401, { message: 'Authentication required' });
      }

      const organizationGrant = await getUserOrganizationId(busterUser.id);

      if (!organizationGrant) {
        throw new HTTPException(400, { message: 'Organization not found' });
      }

      // Get active integration
      const integration = await slackHelpers.getActiveIntegration(organizationGrant.organizationId);

      if (!integration) {
        return c.json(
          {
            error: 'No active Slack integration found',
            code: 'INTEGRATION_NOT_FOUND',
          },
          404
        );
      }

      // Get token from vault
      const token = await slackOAuthService.getTokenFromVault(integration.id);

      if (!token) {
        throw new SlackError(
          'Failed to retrieve authentication token',
          500,
          'TOKEN_RETRIEVAL_ERROR'
        );
      }

      // Fetch channels using the SlackChannelService
      const channelService = new SlackChannelService();
      const channels = await channelService.getAvailableChannels(token, false);

      // Update last used timestamp
      await slackHelpers.updateLastUsedAt(integration.id);

      // Return only id and name as requested
      return c.json({
        channels: channels.map((channel) => ({
          id: channel.id,
          name: channel.name,
        })),
      });
    } catch (error) {
      console.error('Failed to get channels:', error);

      if (error instanceof HTTPException) {
        throw error;
      }

      // Handle Slack-specific errors
      if (error instanceof Error && error.message.includes('Invalid or expired access token')) {
        throw new SlackError('Invalid or expired access token', 401, 'INVALID_TOKEN');
      }

      if (error instanceof Error && error.message.includes('Rate limit exceeded')) {
        throw new SlackError('Rate limit exceeded. Please try again later.', 429, 'RATE_LIMITED');
      }

      throw new SlackError(
        error instanceof Error ? error.message : 'Failed to get channels',
        500,
        'GET_CHANNELS_ERROR'
      );
    }
  }
}

// Export singleton instance
export const slackHandler = new SlackHandler();
