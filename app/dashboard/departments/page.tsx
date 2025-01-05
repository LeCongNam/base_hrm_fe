"use client";

import InputField from "@/components/InputField";
import SwitchField from "@/components/SwitchField";
import { Department } from "@/types/department.type";
import { Position } from "@/types/position.type";
import { SendOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  notification,
  Row,
  Switch,
  Table,
  TableProps,
} from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { departmentApi } from "./service";

export default function DepartmentPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Department>({
    defaultValues: { isActive: true, description: "" },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [listPositions, setListPositions] = useState<Department[]>([]);
  const [api, contextHolder] = notification.useNotification();

  const getList = async (payload: Partial<Department>) => {
    try {
      const { data } = await departmentApi.getList(payload);

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

  const onSubmit = async (payload: Department) => {
    try {
      const { data } = await departmentApi.create(payload);
      setListPositions((prev) => [...prev, { ...data, id: data.id }]);

      openNotification("Thành công", "Thêm nhân sự thành công!", "success");
    } catch (error) {
      console.error("Error creating department:", error);
      openNotification("Lỗi", "Có lỗi xảy ra khi thêm nhân sự!", "error");
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
      title: "Address",
      dataIndex: "address",
      key: "address",
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
      {contextHolder}
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <Row gutter={16}>
          <Col span={6}>
            <InputField
              name="name"
              label="Tên vị trí"
              control={control}
              rules={{ required: "Tên vị trí là bắt buộc" }}
              placeholder="name"
            />
          </Col>
          <Col span={6}>
            <InputField
              name="description"
              label="Mô tả"
              control={control}
              rules={{ required: "Mô tả là bắt buộc" }}
              placeholder="description"
            />
          </Col>
          <Col span={6}>
            <InputField
              name="address"
              label="Địa chỉ văn phòng"
              control={control}
              rules={{ required: "Địa chỉ văn phòng là bắt buộc" }}
              placeholder="address"
            />
          </Col>
          <Col span={6}>
            <SwitchField
              name="isActive"
              label="Active Status"
              control={control}
              required={true}
            />
          </Col>
        </Row>
        <div className="flex justify-start">
          <Button
            type="primary"
            htmlType="submit"
            icon={<SendOutlined />}
          >
            Thêm nhân sự
          </Button>
        </div>
      </Form>
      <div>
        <Table<Position>
          columns={columns}
          dataSource={listPositions}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          loading={isLoading}
          rowKey="id"
        />
      </div>
    </div>
  );
}
