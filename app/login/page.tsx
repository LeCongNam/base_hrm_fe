"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { useForm, Controller } from "react-hook-form";
import { GoogleOutlined } from "@ant-design/icons";
import MicrosoftIcon from "@/components/MicrosoftIcon";
import Image from "next/image";

type SignInFormInputs = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const { control, handleSubmit } = useForm<SignInFormInputs>();
  const [providers, setProviders] = useState<any>(null);
  const [collapsed, setCollapsed] = useState(false); // Giả sử đây là trạng thái collapsed (có thể dùng logic bên ngoài)

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);

  const onSubmit = (data: SignInFormInputs) => {
    console.log("Form Data:", data);
    alert("Custom authentication is not implemented in this demo!");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f6f8fb",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Tiêu đề */}
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "20px",
            background: "linear-gradient(to right, #4facfe, #00f2fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Chào mừng trở lại!
        </h1>

        {/* Logo */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src="/logo.png" // Đảm bảo đường dẫn là đúng, ảnh nằm trong thư mục public
            alt="Logo"
            priority={true}
            width={40} // Kích thước logo nhỏ lại
            height={40}
            className="rounded-full"
          />
        </div>

        {/* Form */}
        <Form
          onFinish={handleSubmit(onSubmit)}
          layout="vertical"
        >
          <Form.Item label="Email">
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập email"
                />
              )}
            />
          </Form.Item>
          <Form.Item label="Mật khẩu">
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Nhập mật khẩu"
                />
              )}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
            >
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>

        {/* Dăng nhập với các provider */}
        <Typography.Paragraph>Hoặc đăng nhập bằng:</Typography.Paragraph>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {providers &&
            Object.values(providers).map((provider: any) => (
              <Button
                key={provider.name}
                block
                onClick={() => signIn(provider.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  border: "1px solid #ddd",
                  color: provider.name === "Google" ? "#DB4437" : "#0078D4",
                  backgroundColor: "#fff",
                  transition:
                    "background-color 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    provider.name === "Google" ? "#FBE9E7" : "#E6F4FF")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                {provider.name === "Google" ? (
                  <GoogleOutlined />
                ) : (
                  <MicrosoftIcon style={{ fontSize: "16px" }} />
                )}
                Đăng nhập bằng {provider.name}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}
