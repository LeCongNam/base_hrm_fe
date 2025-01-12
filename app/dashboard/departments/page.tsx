"use client";

import { Department } from "@/types/department.type";
import { Position } from "@/types/position.type";
import { notification, Switch, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import FormCreateDepartment from "./_components/FormCreateDepartment";
import { departmentDashboardApi } from "./service";

export default function DepartmentPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listPositions, setListPositions] = useState<Department[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [isReset, setIsReset] = useState<boolean>(false);
  const getList = async (payload: Partial<Department>) => {
    try {
      const { data } = await departmentDashboardApi.getList(payload);

      setListPositions(
        data.map((item: Department) => ({ ...item, key: item.id })),
      );
    } catch (e) {
      console.error("Error fetching list:", e);
    }
  };

  const openNotification = (
    message: string,
    description: string,
    type: "success" | "error",
  ) => {
    api[type]({
      message,
      description,
      showProgress: true,
      pauseOnHover: true,
      placement: "bottomRight",
    });
  };

  const handleSubmit = async (payload: Department) => {
    try {
      const { data } = await departmentDashboardApi.create(payload);
      setListPositions((prev) => [...prev, { ...data, id: data.id }]);

      openNotification("Thành công", "Thêm phòng ban thành công!", "success");
    } catch (error) {
      console.error("Error creating department:", error);
      openNotification("Lỗi", "Có lỗi xảy ra khi thêm phòng ban!", "error");
    }
  };

  const columns: TableProps<Department>["columns"] = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "isActive",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean, record: Position) => (
        <Switch
          defaultChecked={isActive}
          onChange={async (checked: boolean) => {
            try {
              await departmentApi.updateActive(record.id, checked);
              await getList({});
              openNotification(
                "Thành công",
                "Cập nhật trạng thái thành công!",
                "success",
              );
            } catch (error) {
              console.error("Error updating isActive:", error);
              openNotification(
                "Lỗi",
                "Không thể cập nhật trạng thái!",
                "error",
              );
            }
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      await getList({});
      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <FormCreateDepartment
          onSubmit={handleSubmit}
          isReset={isReset}
          onResetDone={() => {
            setIsReset(!isReset);
          }}
        />
      </div>

      <div>
        <Table<Position>
          columns={columns}
          dataSource={listPositions}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          loading={isLoading}
          rowKey="id"
        />
      </div>

      {/* Modal */}
      {contextHolder}
    </div>
  );
}
