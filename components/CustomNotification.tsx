import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";
import React, { useEffect } from "react";

interface CustomNotificationProps {
  message: string;
  description: string;
  show: boolean;
  pauseOnHover?: boolean;
  duration?: number;
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}

const CustomNotification: React.FC<CustomNotificationProps> = ({
  message,
  description,
  show,
  pauseOnHover = true,
  duration = 3,
  placement = "topRight",
}) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (show) {
      api.open({
        message,
        description,
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        style: {
          width: 400,
          backgroundColor: "#f0f5ff",
          border: "1px solid #91d5ff",
        },
        placement,
        duration,
        showProgress: true,
        pauseOnHover,
      });
    }
  }, [show, api, message, description, pauseOnHover, duration, placement]);

  return <>{contextHolder}</>;
};

export default CustomNotification;
