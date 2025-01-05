import { Table } from "antd";

export interface CustomTableProps {
  columns: Array<any>;
  dataSource: unknown[];
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize?: number) => void;
  };
  rowKey?: string;
  bordered?: boolean;
  loading?: boolean;
  showId: boolean;
}

export default function CustomTable({
  columns,
  dataSource,
  pagination,
  rowKey = "id",
  bordered = true,
  loading = false,
  showId = true,
}: CustomTableProps) {
  let id = 0;
  if (showId) {
    columns.unshift({
      title: "ID",
      dataIndex: "id",
      key: "id",
      onCell: () => (id += 1),
    });
  }

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      bordered={bordered}
      loading={loading}
      pagination={pagination}
      rowKey={rowKey}
    />
  );
}
