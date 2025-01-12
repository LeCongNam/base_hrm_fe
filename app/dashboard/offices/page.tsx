"use client";

import { Department } from "@/types/department.type";
import { Office } from "@/types/office.type";
import { Position } from "@/types/position.type";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Modal,
  notification,
  Switch,
  Table,
  TableProps,
} from "antd";
import { useEffect, useState } from "react";
import FormCreateOffice from "./_components/FormCreateOffice";
import { officeDashboardApi } from "./service";

export default function OfficePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listPositions, setListPositions] = useState<Position[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [isReset, setIsReset] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<number | undefined>();
  const [modalText, setModalText] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<Partial<Department>>({});

  // Kiểm tra xem hàng có đang trong chế độ chỉnh sửa hay không
  const isEditing = (record: Department) => record.id === editingKey;

  // Cột trong bảng
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
      render: (text, record) => {
        return isEditing(record) ? (
          <Input
            value={editedRow.name || record.name}
            onChange={(e) =>
              setEditedRow((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => {
        return isEditing(record) ? (
          <Input
            value={editedRow.description || record.description}
            onChange={(e) =>
              setEditedRow((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, record) => {
        return isEditing(record) ? (
          <Input
            value={editedRow.address || record.address}
            onChange={(e) =>
              setEditedRow((prev) => ({ ...prev, address: e.target.value }))
            }
          />
        ) : (
          text
        );
      },
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
              await officeDashboardApi.updateActive(record.id, checked);
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
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="flex gap-2">
            <Button
              type="link"
              onClick={() => saveEdit(record.id)}
            >
              Save
            </Button>
            <Button
              type="link"
              onClick={cancelEdit}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex gap-5">
            <EditOutlined
              className="text-xl cursor-pointer hover:text-blue-700"
              onClick={() => {
                setEditingKey(record.id); // Chuyển sang chế độ edit
                setEditedRow(record); // Lưu dữ liệu hiện tại vào state
              }}
            />
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

  // Gọi API lấy danh sách
  const getList = async (payload: Partial<Department>) => {
    try {
      const { data } = await officeDashboardApi.getList(payload);
      setListPositions(
        data.map((item: Department) => ({ ...item, key: item.id })),
      );
    } catch (e) {
      console.error("Error fetching list:", e);
    }
  };

  // Gọi API lưu dữ liệu chỉnh sửa
  const saveEdit = async (id: number) => {
    try {
      await officeDashboardApi.update(id, editedRow);
      openNotification("Thành công", "Cập nhật thành công!", "success");
      setEditingKey(null); // Thoát khỏi chế độ chỉnh sửa
      setEditedRow({}); // Xóa dữ liệu tạm thời
      await getList({}); // Làm mới danh sách
    } catch (error) {
      console.error("Error updating department:", error);
      openNotification("Lỗi", "Không thể cập nhật!", "error");
    }
  };

  // Hủy chỉnh sửa
  const cancelEdit = () => {
    setEditingKey(null);
    setEditedRow({});
  };

  // Thông báo
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

  // Xử lý khi xóa
  const handleOk = async () => {
    setModalText("Popup will auto close!!");
    setConfirmLoading(true);
    await officeDashboardApi.delete(idDelete);
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
    (async () => {
      await getList({});
      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <FormCreateOffice
          onSubmit={async (payload: Office) => {
            try {
              const { data } = await officeDashboardApi.create(payload);
              setListPositions((prev) => [...prev, { ...data, id: data.id }]);
              openNotification(
                "Thành công",
                "Thêm văn phòng thành công!",
                "success",
              );
              setIsReset(true);
            } catch (error) {
              console.error("Error creating department:", error);
              openNotification(
                "Lỗi",
                "Có lỗi xảy ra khi thêm văn phòng!",
                "error",
              );
            }
          }}
          isReset={isReset}
          onResetDone={() => setIsReset(false)}
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

      <div>{contextHolder}</div>

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
