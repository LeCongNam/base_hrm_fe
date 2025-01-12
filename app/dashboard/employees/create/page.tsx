"use client";
import { employeeApi } from "@/app/dashboard/employees/service";
import DatePickerField from "@/components/DatePickerField";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import { Department } from "@/types/department.type";
import { Employee } from "@/types/employee.type";
import { Office } from "@/types/office.type";
import { User } from "@/types/user.type";
import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Switch } from "antd";
import { pick } from "lodash-es";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { departmentDashboardApi } from "../../departments/service";
import { officeDashboardApi } from "../../offices/service";

export default function FormCreateEmployee() {
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<Employee & Partial<User>>();
  const [isAutoIncrement, setIsAutoIncrement] = useState(false);
  const [listDepartments, setListDepartments] = useState<Department[]>([]);
  const [listOffices, setListOffices] = useState<Office[]>([]);

  const router = useRouter();

  const onSwitchChange = (checked: boolean) => {
    setIsAutoIncrement(checked);
  };

  const onSubmit = async (data: Employee) => {
    try {
      const userDataPicked = pick(data, [
        "lastName",
        "email",
        "phoneNumber",
        "gender",
        "birthday",
      ]);
      const employeeDataPicked = pick(data, [
        "employeeId",
        "startDate",
        "departmentId",
        "positionId",
        "specialization",
      ]);

      const response = await employeeApi.create({
        user: userDataPicked as unknown as Partial<User>,
        employee: employeeDataPicked,
        // isAutoIncrement,
      });
      setShowNotification(true);

      if (response) {
        router.replace("/dashboard/employees");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getListDepartments = async () => {
    try {
      const { data } = await departmentDashboardApi.getList();
      setListDepartments(data);
    } catch (e) {
      console.error(e);
    }
  };

  const getListOffices = async () => {
    try {
      const { data } = await officeDashboardApi.getList();
      setListOffices(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getListDepartments();
    getListOffices();
  }, []);

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <Row className="mb-4">
          <Col>
            <p className="font-bold text-base">Thông tin nhân viên</p>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={4}>
            <InputField
              name="employeeId"
              label="Mã nhân sự"
              control={control}
              rules={{ required: !isAutoIncrement && "Mã nhân sự là bắt buộc" }}
              placeholder="Mã nhân sự"
              disabled={isAutoIncrement}
            />
            <Switch
              checked={isAutoIncrement}
              onChange={onSwitchChange}
              style={{ marginTop: 8 }}
            />
            <span style={{ marginLeft: 8 }}>Tự động tạo mã nhân viên</span>
          </Col>
          <Col span={4}>
            <DatePickerField
              name="startDate"
              label="Ngày bắt đầu"
              control={control}
              rules={{ required: "Ngày bắt đầu là bắt buộc" }}
              required={true}
            />
          </Col>
          <Col span={4}>
            <SelectField
              name="departmentId"
              label="Phòng ban"
              control={control}
              rules={{ required: "Phòng ban là bắt buộc" }}
              //         { value: "IT", label: "IT" },
              options={
                listDepartments.map((department) => ({
                  value: department.id,
                  label: department.name.toUpperCase(),
                })) as unknown as any[]
              }
            />
          </Col>
          <Col span={4}>
            <SelectField
              name="positionId"
              label="Chức danh hiện tại"
              control={control}
              rules={{ required: "Chức danh hiện tại là bắt buộc" }}
              options={[
                ...(listDepartments.map((department) => ({
                  value: department.id,
                  label: department.name.toUpperCase(),
                })) as unknown as []),
              ]}
            />
          </Col>
          <Col span={4}>
            <SelectField
              name="officeId"
              label="Văn phòng"
              control={control}
              rules={{ required: "Văn phòng là bắt buộc" }}
              options={[
                ...(listOffices.map((office) => ({
                  value: officeid,
                  label: office.name.toUpperCase(),
                })) as unknown as []),
              ]}
              showSearch
            />
          </Col>
          <Col span={4}>
            <InputField
              name="specialization"
              label="Lý do / Chuyên môn"
              control={control}
              rules={{ required: "Lý do hoặc chuyên môn là bắt buộc" }}
              placeholder="Nhập lý do hoặc chuyên môn"
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <p className="font-bold text-base">Thông tin cá nhân</p>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={4}>
            <InputField
              name="firstName"
              label="Họ"
              control={control}
              rules={{ required: "Họ là bắt buộc" }}
              placeholder="Nhập lý do hoặc chuyên môn"
              required
            />
          </Col>
          <Col span={4}>
            <InputField
              name="lastName"
              label="Tên và tên lót"
              control={control}
              rules={{ required: "Tên và tên lót là bắt buộc" }}
              placeholder="Nhập Tên và tên lót"
              required
            />
          </Col>
          <Col span={4}>
            <InputField
              name="email"
              label="email"
              control={control}
              rules={{ required: "email là bắt buộc" }}
              placeholder="email@gmail.com"
              required
            />
          </Col>
          <Col span={4}>
            <InputField
              name="phoneNumber"
              label="Số điện thoaị"
              control={control}
              rules={{ required: "Số điện thoaị là bắt buộc" }}
              placeholder="038.xxx.xxx"
              required
            />
          </Col>
          <Col span={4}>
            <SelectField
              name="gender"
              label="Giới tính"
              control={control}
              rules={{ required: "Giới tính" }}
              options={[
                { value: "unknown", label: "unknown" },
                { value: "male", label: "male" },
                { value: "female", label: "female" },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={4}>
            <DatePickerField
              name="birthday"
              label="Ngày Sinh"
              control={control}
              rules={{ required: "Ngày Sinh là bắt buộc" }}
              required
            />
          </Col>
        </Row>

        <div
          className="flex justify-start"
          style={{ marginTop: 16 }}
        >
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
    </div>
  );
}
