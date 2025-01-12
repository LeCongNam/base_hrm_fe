import InputField from "@/components/InputField";
import SwitchField from "@/components/SwitchField";
import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row } from "antd";
import { Position } from "postcss";
import { useForm } from "react-hook-form";

export default function FormCreatePosition({ onSubmit }: FormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Position>({
    defaultValues: { isActive: true, description: "" },
  });

  return (
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
          Thêm vị trí
        </Button>
      </div>
    </Form>
  );
}
