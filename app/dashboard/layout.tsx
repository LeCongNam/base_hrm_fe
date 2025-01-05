"use client";

import BreadcrumbComponent from "@/app/dashboard/(layouts)/BreadcrumbComponent";
import {
  AuditOutlined,
  BellOutlined,
  DashboardOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Dropdown,
  Input,
  Layout,
  Menu,
  MenuProps,
  theme,
} from "antd";
import { Content } from "antd/es/layout/layout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo, useState } from "react";

const { Header, Footer, Sider } = Layout;
const { Search } = Input;

const sideBarItems: any[] = [
  {
    key: "/dashboard",
    label: <Link href="/dashboard">Home</Link>,
    icon: <DashboardOutlined />,
  },
  {
    key: "/dashboard/employees",
    label: <Link href="/dashboard/employees">Nhân sự</Link>,
    icon: <UserOutlined />,
  },
  {
    key: "/dashboard/positions",
    label: <Link href="/dashboard/positions">Vị trí</Link>,
    icon: <AuditOutlined />,
  },
  {
    key: "/dashboard/departments",
    label: <Link href="/dashboard/departments">Phòng ban</Link>,
    icon: <HomeOutlined />,
  },
];

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "My Account",
    disabled: true,
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Profile",
    extra: "⌘P",
  },
  {
    key: "3",
    label: "Billing",
    extra: "⌘B",
  },
  {
    key: "4",
    label: "Settings",
    icon: <SettingOutlined />,
    extra: "⌘S",
  },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  let pathHighLight = usePathname();

  if (pathHighLight.split("/").length > 3) {
    pathHighLight = pathHighLight.slice(0, pathHighLight.lastIndexOf("/"));
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="flex flex-col justify-center items-center gap-3 py-5 cursor-pointer"
          style={{ width: "100%" }}
        >
          {/* Logo */}
          <div
            style={{
              width: "100%",
              height: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src="/logo.png"
              alt="logo.png"
              priority={true}
              width={collapsed ? 40 : 80}
              height={collapsed ? 40 : 80}
              className="rounded-full"
            />
          </div>
          <p className="text-white font-bold">{collapsed ? "" : "Base HRM"}</p>
        </div>
        <Menu
          theme="dark"
          selectedKeys={[pathHighLight]} // Highlight active path
          mode="inline"
          items={sideBarItems}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header
          style={{
            background: "#001529",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          {/* Left: Search */}
          <div className="flex-1 flex items-center justify-start">
            <Search
              placeholder="Tìm kiếm nhân viên"
              style={{ width: 400 }}
            />
          </div>

          {/* Right: Notification + Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Notification Icon */}
            <Dropdown
              menu={{ items }}
              dropdownRender={(menu) => (
                <div
                  style={{
                    width: "500px",
                    maxHeight: "300px",
                    height: "700px",
                  }}
                >
                  {menu}
                </div>
              )}
            >
              <Badge
                count={5}
                size="small"
              >
                <BellOutlined
                  style={{ fontSize: 20, color: "white", cursor: "pointer" }}
                />
              </Badge>
            </Dropdown>

            {/* Avatar */}
            <Dropdown menu={{ items }}>
              <Avatar
                style={{ backgroundColor: "green", verticalAlign: "middle" }}
                size="large"
                gap={8}
              >
                Nam
              </Avatar>
            </Dropdown>
          </div>
        </Header>

        {/* Content */}
        <Content style={{ margin: "0 16px" }}>
          <BreadcrumbComponent />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default memo(DashboardLayout);
