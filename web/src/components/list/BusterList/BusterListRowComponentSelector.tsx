import React from 'react';
import { BusterListRow, BusterListColumn } from './interfaces';
import { BusterListSectionComponent } from './BusterListSectionComponent';
import { BusterListRowComponent } from './BusterListRowComponent';

export const BusterListRowComponentSelector = React.forwardRef<
  HTMLDivElement,
  {
    row: BusterListRow;
    columns: BusterListColumn[];
    id: string;
    onSelectChange?: (v: boolean, id: string) => void;
    onSelectSectionChange?: (v: boolean, id: string) => void;
    onContextMenuClick?: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
    selectedRowKeys?: string[];
    rows: BusterListRow[];
    style?: React.CSSProperties;
  }
>(
  (
    {
      style,
      row,
      rows,
      columns,
      onSelectChange,
      onSelectSectionChange,
      selectedRowKeys,
      onContextMenuClick
    },
    ref
  ) => {
    if (row.rowSection) {
      return (
        <BusterListSectionComponent
          style={style}
          rowSection={row.rowSection}
          ref={ref}
          id={row.id}
          key={row.id}
          rows={rows}
          selectedRowKeys={selectedRowKeys}
          onSelectSectionChange={onSelectSectionChange}
        />
      );
    }

    return (
      <BusterListRowComponent
        style={style}
        row={row}
        columns={columns}
        key={row.id}
        onSelectChange={onSelectChange}
        checked={!!selectedRowKeys?.includes(row.id)}
        ref={ref}
        onContextMenuClick={onContextMenuClick}
      />
    );
  }
);
BusterListRowComponentSelector.displayName = 'BusterListRowComponent';
