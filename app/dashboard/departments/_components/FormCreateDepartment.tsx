import InputField from "@/components/InputField";
import SwitchField from "@/components/SwitchField";
import { Department } from "@/types/department.type";
import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row } from "antd";
import { useForm } from "react-hook-form";

export default function FormCreateDepartment({ onSubmit }: FormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Department>({
    defaultValues: { isActive: true, description: "" },
  });

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <Row gutter={16}>
        <Col span={6}>
          <InputField
            name="name"
            label="Tên Phòng Ban"
            control={control}
            rules={{ required: "Tên Phòng Ban là bắt buộc" }}
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
          Thêm Phòng Ban
        </Button>
      </div>
    </Form>
  );
}
