import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import React, { useState } from "react";
import "../../../assets/stylesheet/body.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import TrangChuAdmin from "./TrangChuAdmin";
import DanhSachDanhMuc from "./QuanLyDanhMuc/DanhSachDanhMuc";
import DanhSachNhanHieu from "./QuanLyNhanHieu/DanhSachNhanHieu";
import DanhSachSanPham from "./QuanLySanPham/DanhSachSanPham";
import ThemMoiSanPham from "./QuanLySanPham/ThemMoiSanPham";
import { useEffect } from "react";
import DanhSachDonHang from "./QuanLyDonHang/DanhSachDonHang";
import DanhSachBaiViet from "./QuanLyBaiViet/DanhSachBaiViet";
import DanhSachKhuyenMai from "./QuanLyKhuyenMai/DanhSachKhuyenMai";
import DanhSachTaiKhoan from "./QuanLyTaiKhoan/DanhSachTaiKhoan";
import ThemMoiBaiViet from "./QuanLyBaiViet/ThemMoiBaiViet";
import ThemMoiKhuyenMai from "./QuanLyKhuyenMai/ThemMoiKhuyenMai";
import logoAnh from "../../../assets/images/logo_1999sneaker.com.vn.png";
import { useSelector } from "react-redux";

const { Sider, Content } = Layout;
const Admin = () => {
  const infor = useSelector((state) => state.userInfor.information);
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);

  function getItem(label, key, icon, children, type, onClick) {
    return {
      key,
      icon,
      children,
      label,
      type,
      onClick,
    };
  }

  const items = [
    getItem("Trang Chủ", "Admin", <PieChartOutlined />, null, null, () =>
      navigate("/Admin")
    ),
    getItem("Quản lý danh mục", "2", <DesktopOutlined />, [
      getItem("Danh sách danh mục", "DanhSachDanhMuc", null, null, null, () =>
        navigate("/Admin/DanhSachDanhMuc")
      ),
    ]),
    getItem("Quản lý nhãn hiệu", "4", <ContainerOutlined />, [
      getItem("Danh sách nhãn hiệu", "DanhSachNhanHieu", null, null, null, () =>
        navigate("/Admin/DanhSachNhanHieu")
      ),
    ]),
    getItem("Quản lý sản phẩm", "6", <MailOutlined />, [
      getItem("Danh sách sản phẩm", "DanhSachSanPham", null, null, null, () =>
        navigate("/Admin/DanhSachSanPham")
      ),
      getItem("Thêm mới sản phẩm", "ThemMoiSanPham", null, null, null, () =>
        navigate("/Admin/ThemMoiSanPham")
      ),
    ]),
    getItem("Quản lý bài viết", "9", <AppstoreOutlined />, [
      getItem("Danh sách bài viết", "DanhSachBaiViet", null, null, null, () =>
        navigate("/Admin/DanhSachBaiViet")
      ),
      getItem("Thêm mới bài viết", "ThemMoiBaiViet", null, null, null, () =>
        navigate("/Admin/ThemMoiBaiViet")
      ),
    ]),
    getItem("Quản lý khuyến mãi", "12", <MailOutlined />, [
      getItem(
        "Danh sách khuyến mãi",
        "DanhSachKhuyenMai",
        null,
        null,
        null,
        () => navigate("/Admin/DanhSachKhuyenMai")
      ),
      getItem("Thêm mới khuyến mãi", "ThemMoiKhuyenMai", null, null, null, () =>
        navigate("/Admin/ThemMoiKhuyenMai")
      ),
    ]),
    getItem("Quản lý đơn hàng", "15", <MailOutlined />, [
      getItem("Danh sách đơn hàng", "DanhSachDonHang", null, null, null, () =>
        navigate("/Admin/DanhSachDonHang")
      ),
    ]),
    getItem("Quản lý tài khoản", "18", <MailOutlined />, [
      getItem("Danh sách tài khoản", "DanhSachTaiKhoan", null, null, null, () =>
        navigate("/Admin/DanhSachTaiKhoan")
      ),
    ]),
  ];

  useEffect(() => {
    const path = location.pathname.split("/");
    const keys = path[path.length - 1];
    setSelectedKeys([keys]);
  }, [location]);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          height: "70px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 30px",
        }}
      >
        <div
          className="rightIcon"
          style={{
            cursor: "pointer",
          }}
        >
          <HomeOutlined
            style={{ fontSize: "30px" }}
            onClick={() => navigate("/")}
          />
        </div>
        <img src={logoAnh} alt="" style={{ height: "100%" }} />
        <h2>Xin chào {infor.fullName}</h2>
      </div>
      <div
        className="header"
        style={{
          backgroundColor: "#000c17",
          width: "100%",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            backgroundColor: "#000c17",
            color: "white",
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          className="sliderAdmin"
          collapsed={collapsed}
          width={250}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: "10px 0 50px",
              padding: 24,
              height: "80vh",
              overflow: "auto",
            }}
          >
            <Routes>
              <Route path="/Admin/*" element={<TrangChuAdmin />} />
              <Route
                path="/Admin/DanhSachDanhMuc"
                element={<DanhSachDanhMuc />}
              />
              <Route
                path="/Admin/DanhSachNhanHieu"
                element={<DanhSachNhanHieu />}
              />
              <Route
                path="/Admin/DanhSachSanPham"
                element={<DanhSachSanPham />}
              />
              <Route
                path="/Admin/ThemMoiSanPham"
                element={<ThemMoiSanPham />}
              />
              <Route
                path="/Admin/DanhSachDonHang"
                element={<DanhSachDonHang />}
              />
              <Route
                path="/Admin/DanhSachBaiViet"
                element={<DanhSachBaiViet />}
              />
              <Route
                path="/Admin/ThemMoiBaiViet"
                element={<ThemMoiBaiViet />}
              />
              <Route
                path="/Admin/DanhSachKhuyenMai"
                element={<DanhSachKhuyenMai />}
              />
              <Route
                path="/Admin/ThemMoiKhuyenMai"
                element={<ThemMoiKhuyenMai />}
              />
              <Route
                path="/Admin/DanhSachTaiKhoan"
                element={<DanhSachTaiKhoan />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default Admin;
