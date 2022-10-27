import React, { ComponentPropsWithoutRef } from 'react';

/* Type for Molecules */
type TableContents = {
  Meta: typeof TableMeta;
  Head: typeof TableHead;
  Body: typeof TableBody;
  Foot: typeof TableFoot;
};
type TableRowContents = {
  Header: typeof TableHeader;
  Data: typeof TableData;
};
type TableProps = ComponentPropsWithoutRef<'table'>;

type TableMetaProps = ComponentPropsWithoutRef<'caption' | 'colgroup'> & {
  type: 'caption' | 'colgroup';
};

type TableHeadProps = ComponentPropsWithoutRef<'thead'>;
type TableBodyProps = ComponentPropsWithoutRef<'tbody'>;
type TableFootProps = ComponentPropsWithoutRef<'tfoot'>;

type TableRowProps = ComponentPropsWithoutRef<'tr'>;
type TableHeaderProps = ComponentPropsWithoutRef<'th'>;
type TableDataProps = ComponentPropsWithoutRef<'td'>;

/* List of Molecules */
export const Table: React.FC<TableProps> & TableContents = ({ children, ...rest }) => {
  return <table {...rest}>{children}</table>;
};

export const TableMeta: React.FC<TableMetaProps> = ({ type, children, ...rest }) => {
  switch (type) {
    case 'caption':
      return <caption {...rest}>{children}</caption>;
    case 'colgroup':
      return <colgroup {...rest}>{children}</colgroup>;
    default:
      return <div {...rest}>{children}</div>;
  }
};

export const TableHead: React.FC<TableHeadProps> = ({ children, ...rest }) => {
  return <thead {...rest}>{children}</thead>;
};
export const TableBody: React.FC<TableBodyProps> = ({ children, ...rest }) => {
  return <tbody {...rest}>{children}</tbody>;
};
export const TableFoot: React.FC<TableFootProps> = ({ children, ...rest }) => {
  return <tfoot {...rest}>{children}</tfoot>;
};

export const TableRow: React.FC<TableRowProps> & TableRowContents = ({ children, ...rest }) => {
  return <tr {...rest}>{children}</tr>;
};
export const TableHeader: React.FC<TableHeaderProps> = ({ children, ...rest }) => {
  return <th {...rest}>{children}</th>;
};
export const TableData: React.FC<TableDataProps> = ({ children, ...rest }) => {
  return <td {...rest}>{children}</td>;
};

/* Setting for Molecules */
Table.Meta = TableMeta;
Table.Head = TableHead;
Table.Body = TableBody;
Table.Foot = TableFoot;

TableRow.Header = TableHeader;
TableRow.Data = TableData;
