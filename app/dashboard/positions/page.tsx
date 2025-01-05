"use client";
import { positionApi } from "@/app/dashboard/positions/service";
import InputField from "@/components/InputField";
import SwitchField from "@/components/SwitchField";
import { Position } from "@/types/position.type";
import { DeleteOutlined, EditOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Col, Form, Modal, Row, Switch, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function PositionPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Position>({
    defaultValues: { isActive: true, description: "" },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [listPositions, setListPositions] = useState<Position[]>([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<string>("");
  const [idDelete, setIdDelete] = useState<number | undefined>();

  const getList = async (payload: Partial<Position>) => {
    try {
      const { data, total } = await positionApi.getList(payload);

      setListPositions(
        data.map((item: Position) => ({ ...item, key: item.id })),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const columns: TableProps<Position>["columns"] = [
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "isActive",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean, record: Position) => (
        <Switch
          // checked={isActive}
          defaultChecked={isActive}
          onChange={async (checked: boolean) => {
            try {
              const response = await positionApi.updateActive(
                record.id,
                checked,
              );
              console.log(response);
              await getList({});
            } catch (error) {
              console.error("Error updating isActive:", error);
            }
          }}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "description",
      key: "description",
      render: (_, record) => {
        return (
          <div className="flex gap-5">
            <EditOutlined className="text-xl cursor-pointer hover:text-blue-700" />
            <DeleteOutlined
              className="text-xl cursor-pointer hover:text-red-500"
              onClick={() => {
                setIdDelete(record.id);
                showModal();
              }}
            />
          </div>
        );
      },
    },
  ];

  const onSubmit = async (data: Position) => {
    try {
      setIsLoading(true);
      const response: Position = await positionApi.create(data);
      getList({});
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const showModal = () => {
    setModalText("Action cannot revert. Do you want continue?");
    setOpen(true);
  };

  const handleOk = async () => {
    setModalText("Popup will auto close!!");
    setConfirmLoading(true);
    await positionApi.delete(idDelete);
    setTimeout(async () => {
      setConfirmLoading(false);
      setOpen(false);
      await getList({});
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getList({});
    setIsLoading(false);
  }, []);

  useEffect(() => {}, [listPositions]);

  return (
    <div>
      <Form
        layout="horizontal"
        onFinish={handleSubmit(onSubmit)}
      >
        <Row gutter={16}>
          <Col span={8}>
            <InputField
              name="name"
              label="Tên vị trí"
              control={control}
              rules={{ required: "tên vị trí là bắt buộc" }}
              placeholder="name"
            />
          </Col>
          <Col span={8}>
            <InputField
              name="description"
              label="Mô tả"
              control={control}
              rules={{ required: "Mô tả là bắt buộc" }}
              placeholder="description"
            />
          </Col>

          <Col span={8}>
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
            iconPosition="end"
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
        />
      </div>

      <div>
        <Modal
          title={`Delete position ${idDelete}`}
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          cancelText="Close"
          okType="danger"
        >
          <p>{modalText}</p>
        </Modal>
      </div>
    </div>
  );
}
