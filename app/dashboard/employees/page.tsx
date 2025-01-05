"use client";
import useSocket from "@/app/websocket/useSocket";
import { Employee } from "@/types/employee.type";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, notification, Row, Table, TableProps } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { employeeApi } from "./service";

export default function EmployeePage() {
  const [dataSource, setDataSource] = useState<Employee[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [take, setTake] = useState(10);
  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const socket = useSocket(`${process.env.NEXT_PUBLIC_API_URL}`);
  const router = useRouter();

  const getList = async (page: number, take: number) => {
    setLoading(true); // Bắt đầu loading ngay khi gọi API
    try {
      const skip = (page - 1) * take;
      const { data, total } = await employeeApi.getList({ skip, take });
      setTimeout(() => {
        setDataSource(() => [
          ...data.map((item: Employee, idx: number) => ({
            ...item,
            key: item.employeeId,
            id: skip + idx + 1, // ID tăng dần dựa trên trang hiện tại
          })),
        ]);
        setTotalItems(total);
        setLoading(false);
      }, 2000); // Delay 2 giây
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList(currentPage, take);
  }, [currentPage, take]);

  useEffect(() => {
    getList(currentPage, take);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("new-data", (msg) => {
      api.success({
        message: `New employee created`,
        description: `New employee with id:  ${msg}`,
        showProgress: true,
        pauseOnHover: true,
        placement: "bottomRight",
      });
      getList(currentPage, take);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  const columns: TableProps<Employee>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
      render: (_, record) => record.user?.email || "-",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Department",
      dataIndex: ["department", "name"], // Nested object
      key: "department",
      render: (_, record) => record.department?.name || "-",
    },
    {
      title: "Action",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => (
        <EditOutlined
          className="hover:text-blue-400 text-xl"
          onClick={() =>
            router.replace(`/dashboard/employees/${record.employeeId}`)
          }
        />
      ),
    },
  ];

  return (
    <div>
      <div>
        <Button
          type="link"
          href="/dashboard/employees/create"
          icon={<PlusOutlined />}
          iconPosition="start"
        >
          Create Employee
        </Button>
      </div>

      <div>
        <Row>
          <Col span={8}>
            <Input
              placeholder="Search employees"
              style={{ marginBottom: 16 }}
            />
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col span={24}>
            <Table
              dataSource={dataSource}
              columns={columns}
              bordered
              pagination={{
                current: currentPage,
                pageSize: take,
                total: totalItems,
                showSizeChanger: true,
                onChange: (page, size) => {
                  setCurrentPage(page);
                  setTake(size || take);
                },
              }}
              rowKey="employeeId"
              loading={loading}
            />
          </Col>
        </Row>
      </div>

      <div>{contextHolder}</div>
    </div>
  );
}
