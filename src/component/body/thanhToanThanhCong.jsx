import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const ThanhToanThanhCong = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>
          <CheckCircleOutlined style={{ color: "green" }} /> Payment Successful
        </h2>
        <div>
          <Button onClick={() => navigate("/")}>
            Đến Trang chủ
          </Button>
          <span style={{ padding: "0 10px" }}></span>
          <Button onClick={() => navigate("/LichSuDatHang")}>
            Đến Giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThanhToanThanhCong;
