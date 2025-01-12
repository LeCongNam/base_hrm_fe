"use client";
import { positionDashboardApi } from "@/app/dashboard/positions/service";
import { Position } from "@/types/position.type";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Switch, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import FormCreatePosition from "./_components/FormCreatePosition";

export default function PositionPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listPositions, setListPositions] = useState<Position[]>([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<string>("");
  const [idDelete, setIdDelete] = useState<number | undefined>();

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
              const response = await positionDashboardApi.updateActive(
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

  const getList = async (payload: Partial<Position>) => {
    try {
      const { data, total } = await positionDashboardApi.getList(payload);

      setListPositions(
        data.map((item: Position) => ({ ...item, key: item.id })),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (data: Position) => {
    try {
      setIsLoading(true);
      await positionDashboardApi.create(data);
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
    await positionDashboardApi.delete(idDelete);
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
      <FormCreatePosition onSubmit={handleSubmit} />
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
