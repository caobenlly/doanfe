import { Menu } from "antd";
import { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import "../../assets/stylesheet/header.css";
import { useNavigate } from "react-router-dom";
export default function ComponentHeader() {
  const [selectedKey, setSelectedKeys] = useState("1");
  const navigate = useNavigate();

  const menuLeft = [
    {
      key: 1,
      label: "Trang Chủ",
      icon: <HomeOutlined style={{ fontSize: "20px" }} />,
    },
  ];
  const menuRight = [
    {
      key: 2,
      label: "Sản Phẩm",
    },
    {
      key: 3,
      label: "Tin Tức",
    },
    {
      key: 4,
      label: "Chính Sách",
    },
    {
      key: 5,
      label: "Cửa Hàng",
    },
  ];
  function handleClick(e) {
    setSelectedKeys(e.key);
    switch (e.key) {
      case "1":
        navigate("/");
        break;
      case "2":
        navigate("/SanPham");
        break;
      case "3":
        navigate("/TinTuc");
        break;
      case "4":
        navigate("/ChinhSach");
        break;
      case "5":
        navigate("/LienHe");
        break;
      default:
        break;
    }
  }
  return (
    <>
      <div
        className="text"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 200px",
        }}
      >
        <Menu
          style={{
            fontSize: "20px",
            flex: "1",
            fontfamily: "revert",
          }}
          onClick={handleClick}
          theme="light"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuLeft}
        />
        <Menu
          style={{
            fontSize: "20px",
            flex: "1",
            justifyContent: "end",
            fontfamily: "revert",
          }}
          onClick={handleClick}
          theme="light"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuRight}
        />
      </div>
    </>
  );
}
