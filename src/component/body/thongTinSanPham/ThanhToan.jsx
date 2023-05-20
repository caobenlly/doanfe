/* eslint-disable react-hooks/exhaustive-deps */
import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Popover } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useEffect } from "react";
import { ModalSize } from "./thongtinSanPham";
import callApi from "../../../api/api";
import { useSelector } from "react-redux";
import HTTP_METHOD from "../../../api/method";
import { messageError, messageSuccess } from "../../../assets/comonFc";
import { useNavigate } from "react-router-dom";
import imgBank from "../../../assets/images/140244ncbbank.jpg";
export default function CheckoutForm({
  show,
  closeModal,
  data,
  menuSize,
  sizeCheck,
}) {
  const [form] = Form.useForm();
  const [showSize, setShowSize] = useState(false);
  const [size, setSize] = useState(sizeCheck);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState();
  const infor = useSelector((state) => state.userInfor.information);
  const navigate = useNavigate();
  const { Search } = Input;
  useEffect(() => {
    setSize(sizeCheck);
    form.setFieldsValue({
      receiver_name: infor.fullName,
      receiver_phone: +infor.phone,
    });
  }, [show]);
  function onSearch(e) {
    callApi({
      url: `/admin/promotions/check/${e}`,
      method: HTTP_METHOD.GET,
    }).then((res) => {
      if (res.message) {
        messageError(res.message);
      }
      setCouponCode(e);
      if (res.type) {
        setDiscount((data.price * res.giam) / 100);
        return;
      }
      setDiscount(res.giam || 0);
    });
  }
  function handleBuy() {
    form.validateFields().then((res) => {
      if (res?.errorFields?.length > 0) {
        return;
      }
      const dataBuy = {
        size: size.key,
        product_id: data.id,
        coupon_code: couponCode,
        total_price: data.price,
        product_price: data.price - discount,
        ...form.getFieldsValue(true),
      };
      callApi({
        url: "/home/api/orders",
        method: HTTP_METHOD.POST,
        data: dataBuy,
      }).then((res) => {
        if (res.message) {
          messageError(res.message);
          return;
        }
        messageSuccess("Đặt hàng thành công");
        navigate("/LichSuDatHang");
      });
    });
  }
  function handleBank() {
    form.validateFields().then((res) => {
      if (res?.errorFields?.length > 0) {
        return;
      }
      const dataBuy = {
        size: size.key,
        product_id: data.id,
        coupon_code: couponCode,
        total_price: data.price,
        product_price: data.price - discount,
        ...form.getFieldsValue(true),
      };
      callApi({
        url: "/home/api/orders",
        method: HTTP_METHOD.POST,
        data: dataBuy,
      })
      callApi({
        url: `/api/thanhtoan?bankcode=NCB&amount=${
          data.price - discount
        }&vnp_OrderInfo=${data.name}`,
        method: HTTP_METHOD.POST,
      }).then((res) => {
        window.location.href = res.data;
      });
    });
  }
  const content = (
    <div>
      <span onClick={handleBank}>
        <img src={imgBank} alt="" style={{ height: "30px", width: "100px" }} />{" "}
      </span>
    </div>
  );
  return (
    <>
      <Modal
        width={1500}
        open={show}
        onCancel={closeModal}
        footer={[<Button onClick={closeModal}>Thoát</Button>]}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ minWidth: "500px" }} className="thongtinnguoinhan">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: "500px",
                  width: "700px",
                }}
              >
                <h2 style={{ textAlign: "center" }}>Thông tin người nhận</h2>
                <Form
                  form={form}
                  labelCol={{
                    span: 8,
                  }}
                  layout="horizontal"
                  style={{
                    maxWidth: 600,
                  }}
                >
                  <label>
                    Tên người nhận <span style={{ color: "red" }}>(*)</span>
                  </label>
                  <Form.Item
                    name="receiver_name"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                  <label>
                    Số Điện thoại <span style={{ color: "red" }}>(*)</span>
                  </label>

                  <Form.Item
                    name="receiver_phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập",
                      },
                    ]}
                  >
                    <InputNumber size="large" style={{ width: "100%" }} />
                  </Form.Item>
                  <label>
                    Địa chỉ <span style={{ color: "red" }}>(*)</span>
                  </label>

                  <Form.Item
                    name="receiver_address"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập",
                      },
                    ]}
                  >
                    <TextArea
                      autoSize={{
                        minRows: 4,
                      }}
                    />
                  </Form.Item>
                  <label>
                    Ghi chú <span style={{ color: "red" }}>(*)</span>
                  </label>

                  <Form.Item
                    name="note"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập",
                      },
                    ]}
                  >
                    <TextArea
                      autoSize={{
                        minRows: 4,
                      }}
                    />
                  </Form.Item>
                </Form>
                <div>
                  <Popover placement="bottom" content={content} trigger="hover">
                    <Button type="primary">Thanh toán online</Button>
                  </Popover>
                  ,
                  <Button type="primary" onClick={handleBuy}>
                    Thanh toán tiền mặt
                  </Button>
                  ,
                </div>
              </div>
            </div>
          </div>
          <div className="thongtindonhang" style={{ minWidth: "500px" }}>
            <div className="product-info">
              <img
                style={{ width: "100%", height: " 300px" }}
                src={data.productImages[0]}
                alt="Lỗi"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "350px",
                }}
                className="product-details"
              >
                <div className="product-size">
                  <div
                    className="inpuSelectSize"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0 5px",
                      height: "30px",
                    }}
                    onClick={() => {
                      setShowSize(true);
                    }}
                  >
                    <span>SIZE</span>
                    <span>{size?.value}</span>
                    <span>
                      <CaretDownOutlined />
                    </span>
                  </div>
                </div>
                <div className="product-price">
                  Giá:{" "}
                  <b
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      marginLeft: "20px",
                    }}
                  >
                    {(+data.price).toLocaleString("vi-VN")}
                  </b>
                  đ
                </div>
                <Search
                  placeholder="Nhập mã khuyến mại"
                  allowClear
                  enterButton="Tìm kiếm"
                  size="large"
                  onSearch={onSearch}
                />
                <div className="product-discount">
                  Khuyến mãi:{" "}
                  <b
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      marginLeft: "20px",
                    }}
                  >
                    {(+discount).toLocaleString("vi-VN")}
                  </b>
                  đ
                </div>
                <div className="product-total">
                  Tổng giá:{" "}
                  <b
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      marginLeft: "20px",
                    }}
                  >
                    {(+data.price - discount).toLocaleString("vi-VN")}
                  </b>
                  đ
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ModalSize
        show={showSize}
        setShow={() => setShowSize(false)}
        menuSize={menuSize}
        setSize={setSize}
      />
    </>
  );
}
