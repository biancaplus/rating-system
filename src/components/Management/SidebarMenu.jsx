import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AuditOutlined,
  TeamOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

export default function SidebarMenu() {
  const { t, i18n } = useTranslation();
  const LanguageWidth = useMemo(() => {
    const language = i18n.language;
    if (language === "zh") {
      return "140px";
    } else if (language === "ja") {
      return "160px";
    } else {
      return "210px";
    }
  }, [i18n.language]);

  const menuItems = [
    {
      key: "/management/teacher-management",
      label: t("teacherManagement"),
      icon: <TeamOutlined />,
    },
    {
      key: "/management/rating-audit",
      label: t("scoreAudit"),
      icon: <AuditOutlined />,
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // 根据当前路径自动选中菜单项
  const selectedKeys = [location.pathname];
  const openKeys = menuItems
    .filter((item) =>
      item.children?.some((child) => child.key === location.pathname)
    )
    .map((item) => item.key);

  return (
    <div
      style={{
        width: collapsed ? "60px" : LanguageWidth, // 定义展开/收缩的宽度
        flexShrink: 0, // 禁止宽度被压缩
        backgroundColor: "white",
        transition: "width 0.2s", // 平滑动画
      }}
    >
      <div className="custom-collapsed-icon" onClick={toggleCollapsed}>
        {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
      </div>

      <Menu
        defaultSelectedKeys={["/management/teacher-management"]}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        mode="inline"
        inlineCollapsed={collapsed}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </div>
  );
}
