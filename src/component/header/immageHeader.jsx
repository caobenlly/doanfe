import {
  PhoneOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  WechatFilled,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "../../assets/stylesheet/header.css";
import PopupLogin from "./popupLogin";
import { useDispatch, useSelector } from "react-redux";
import { setInformation } from "../../store/userInfor";

export default function ImmageHeader() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const infor = useSelector((state) => state.userInfor.information);

  function showPopupLogin() {
    setShowPopup(true);
  }
  function handleCancel() {
    setShowPopup(false);
  }
  function checkMode() {
    navigate(`/Admin`);
  }
  function handleLogOut() {
    localStorage.removeItem("expiry_date");
    localStorage.removeItem("token_shopGiay");
    dispatch(setInformation({}));
  }

  const userMenu = () => {
    return (
      <Menu>
        {infor?.roles && (
          <Menu.Item key="profile" onClick={() => navigate("/ThongTinUser")}>
            Thông tin cá nhân
          </Menu.Item>
        )}
        {infor?.roles?.includes("ADMIN") && (
          <Menu.Item onClick={checkMode} key="orders">
            Quản trị viên
          </Menu.Item>
        )}
        {infor.roles ? (
          <Menu.Item onClick={handleLogOut} key="logout">
            Đăng xuất
          </Menu.Item>
        ) : (
          <Menu.Item onClick={showPopupLogin} key="login">
            Đăng nhập
          </Menu.Item>
        )}
      </Menu>
    );
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "150px",
          padding: "0 300px",
          backgroundColor: "white",
        }}
      >
        <div style={{ flex: 1 }}>
          <img className="logoImg" src={logo} alt="Đang lỗi" />
        </div>
        <div style={{ flex: 2, padding: "30px" }}></div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="iconPhone">
              <PhoneOutlined style={{ fontSize: "35px" }} />
            </div>
            <div
              className="hotLine"
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "3px",
                fontSize: "18px",
                fontFamily: "cursive",
              }}
            >
              <div className="textHotLine" style={{ textAlign: "left" }}>
                Hotline
              </div>
              <div className="phoneNumber">0395830008</div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div
            className="admin"
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "flex-end",
            }}
          >
            <div className="chatIcon">
            </div>
            <div
              className="carIcon"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/LichSuDatHang")}
            >
              <ShoppingCartOutlined
                style={{ fontSize: "35px", margin: "0 22px" }}
              />
            </div>
            <div className="userIcon" style={{ cursor: "pointer" }}>
              <Dropdown overlay={userMenu} trigger={["click"]}>
                <UserOutlined
                  style={{ fontSize: "35px", marginLeft: "22px" }}
                />
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      <PopupLogin show={showPopup} handleCancel={handleCancel} />
    </>
  );
}
