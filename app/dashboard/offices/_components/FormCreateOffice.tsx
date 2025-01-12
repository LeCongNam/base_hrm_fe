// Form Component
import InputField from "@/components/InputField";
import SwitchField from "@/components/SwitchField";
import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function FormCreateOffice({
  onSubmit,
  isReset = false,
  onResetDone,
}: FormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { isActive: true, description: "" },
  });

  useEffect(() => {
    if (isReset) {
      reset();
      onResetDone();
    }
  }, [isReset]);

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
          <InputField
            name="address"
            label="Địa chỉ"
            control={control}
            rules={{ required: "Địa chỉ là bắt buộc" }}
            placeholder="address"
          />
        </Col>

        <Col span={6}>
          <SwitchField
            name="isActive"
            label="Active Status"
            control={control}
            required
          />
        </Col>
      </Row>
      <div className="flex justify-start">
        <Button
          type="primary"
          htmlType="submit"
          icon={<SendOutlined />}
        >
          Thêm văn phòng
        </Button>
      </div>
    </Form>
  );
}

export default FormCreateOffice;
