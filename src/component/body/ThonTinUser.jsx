/* eslint-disable react-hooks/exhaustive-deps */
import { Input, InputNumber, Form, Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import callApi from "../../api/api";
import HTTP_METHOD from "../../api/method";
import { messageError, messageSuccess } from "../../assets/comonFc";

function ModalChangePass({ show, handleClose }) {
  const [form] = Form.useForm();
  function handleChangePass() {
    form.validateFields().then((res) => {
      if (res?.errorFields?.length > 0) {
        return;
      }
      const data = form.getFieldsValue(true);
      callApi({
        url: "/api/change-password",
        method: HTTP_METHOD.POST,
        data: data,
      }).then((res) => {
        if (res.message) {
          messageError(res.message);
          return;
        }
        messageSuccess(res);
        handleClose();
      });
    });
  }
  return (
    <Modal
      title="Đổi mật khẩu"
      open={show}
      onCancel={handleClose}
      onOk={handleChangePass}
      width={500}
    >
      <>
        <Form form={form}>
          <Form.Item
            name="old_password"
            label="Mật khẩu cũ"
            labelCol={{ span: 6 }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="new_password"
            label="Mật khẩu mới"
            labelCol={{ span: 6 }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
        </Form>
      </>
    </Modal>
  );
}
export default function ThongTinUser() {
  const [form] = Form.useForm();
  const [show, setShow] = useState(false);
  const infor = useSelector((state) => state.userInfor.information);
  useEffect(() => {
    form.setFieldsValue(infor);
  }, []);

  function handleClick() {
    const data = form.getFieldsValue(true);
    callApi({
      url: "/api/update-profile",
      method: HTTP_METHOD.PUT,
      data: data,
    }).then((res) => {
      if (res.message) {
        messageError(res.message);
        return;
      }
      messageSuccess(res);
    });
  }
  return (
    <div style={{ minWidth: "500px" }} className="thongtinnguoinhan">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: "500px",
            width: "700px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Thông tin user</h2>
          <Form
            form={form}
            labelCol={{
              span: 8,
            }}
            layout="horizontal"
          >
            <label>
              Tên User <span style={{ color: "red" }}>(*)</span>
            </label>
            <Form.Item
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <label>Số Điện thoại</label>

            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
            >
              <InputNumber size="large" style={{ width: "100%" }} />
            </Form.Item>
            <label>Địa chỉ</label>

            <Form.Item
              name="address"
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
          <Button type="primary" onClick={handleClick}>
            Cập nhật thông tin
          </Button>
          <Button type="primary" onClick={() => setShow(true)}>
            Đổi mật khẩu
          </Button>
        </div>
      </div>
      <ModalChangePass show={show} handleClose={() => setShow(false)} />
    </div>
  );
}
