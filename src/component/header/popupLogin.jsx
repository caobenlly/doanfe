import { Checkbox, Form, Input, Modal } from "antd";
import "../../assets/stylesheet/header.css";
import logo from "../../assets/images/logo.png";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import OtpInput from "react18-input-otp";
import callApi from "../../api/api";
import HTTP_METHOD from "../../api/method";
import { useDispatch } from "react-redux";
import { setInformation } from "../../store/userInfor";
import { messageError, messageSuccess } from "../../assets/comonFc";
export default function PopupLogin({ show, handleCancel }) {
  const [form] = Form.useForm();
  const checkRender = (visible) =>
    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;
  const [textTitle, setTextTitle] = useState("ĐĂNG NHẬP");
  const [value, setValue] = useState("");
  const [component, setComponent] = useState("login");
  const [checkEmail, setCheckEmail] = useState(true);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const Login = (
    <>
      <div className="formLogin">
        <Form form={form} labelAlign="left">
          <Form.Item
            name="email"
            labelCol={{ span: 6 }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input
              allowClear
              size="large"
              placeholder="nhập Email"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            labelCol={{ span: 6 }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="nhập mật khẩu"
              prefix={<KeyOutlined />}
              iconRender={checkRender}
            />
          </Form.Item>
        </Form>
      </div>
      {/* Ô remenberme */}
      <div className="remenberme">
        <Checkbox />
        <span> Nhớ tài khoản</span>
      </div>
      <div class="butonLogin">
        <button class="textLogin" onClick={actionLogin}>
          Đăng nhập
        </button>
      </div>
      <div className="forGotPassWord">
        <span
          className="textForGotPassWord"
          onClick={() => actionNavigation("register")}
        >
          Đăng ký tài khoản
        </span>
        <span
          className="textForGotPassWord"
          onClick={() => actionNavigation("checkOtp")}
        >
          Quên mật khẩu
        </span>
      </div>
    </>
  );
  const checkPassWord = (
    <>
      {/* Mật khẩu Đăng ký */}
      <Form form={form} labelAlign="left">
        <Form.Item
          name="password"
          labelCol={{ span: 6 }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập",
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="nhập mật khẩu"
            prefix={<KeyOutlined />}
            iconRender={checkRender}
          />
        </Form.Item>
        <Form.Item
          name="password"
          labelCol={{ span: 6 }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập",
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="nhập lại mật khẩu"
            prefix={<KeyOutlined />}
            iconRender={checkRender}
          />
        </Form.Item>
      </Form>
      <div class="butonLogin">
        <button class="textLogin" onClick={confirmPassWord}>
          Xác nhận
        </button>
      </div>
      <div className="forGotPassWord">
        <span
          className="textForGotPassWord"
          onClick={() => {
            setCheckEmail(true);
            actionNavigation("login");
          }}
        >
          Quay lại đăng nhập
        </span>
      </div>
    </>
  );
  const checkOtp = (
    <>
      {checkEmail ? (
        <>
          <Form form={form} labelAlign="left">
            <Form.Item
              name="userName"
              labelCol={{ span: 6 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
            >
              <Input
                allowClear
                size="large"
                placeholder="nhập email đăng ký"
                prefix={<UserOutlined />}
              />
            </Form.Item>
          </Form>
          <div class="butonLogin">
            <button class="textLogin" onClick={() => confirmEmail()}>
              Xác nhận
            </button>
          </div>
        </>
      ) : (
        <>
          <OtpInput
            containerStyle={{
              justifyContent: "center",
            }}
            className="otp"
            inputStyle={{
              width: "50px",
              height: "50px",
              fontSize: "2rem",
              borderRadius: "10px",
              border: "1px solid rgba(0, 0, 0, 0.3)",
            }}
            value={value}
            onChange={(otp) => {
              setValue(otp);
            }}
            numInputs={6}
            separator={<span>-</span>}
          />
          <div class="butonLogin">
            <button class="textLogin" onClick={() => confirmEmail(true)}>
              Xác nhận
            </button>
          </div>
        </>
      )}
      <div className="forGotPassWord">
        <span
          className="textForGotPassWord"
          onClick={() => {
            setCheckEmail(true);
            actionNavigation("login");
          }}
        >
          Quay lại đăng nhập
        </span>
      </div>
    </>
  );
  const register = (
    <>
      {/* Mật khẩu Đăng ký */}
      <Form form={form} labelAlign="left">
        <Form.Item
          name="fullName"
          labelCol={{ span: 6 }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Họ và tên"
            prefix={<UserOutlined />}
            iconRender={checkRender}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          labelCol={{ span: 6 }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="số điện thoại"
            prefix={<PhoneOutlined />}
            iconRender={checkRender}
          />
        </Form.Item>
        <Form.Item
          name="email"
          labelCol={{ span: 6 }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="nhập email"
            prefix={<UserOutlined />}
            iconRender={checkRender}
          />
        </Form.Item>
        <Form.Item
          name="password"
          labelCol={{ span: 6 }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập",
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="nhập mật khẩu"
            prefix={<KeyOutlined />}
            iconRender={checkRender}
          />
        </Form.Item>
        <Form.Item
          name="rePassword"
          labelCol={{ span: 6 }}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập",
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="nhập lại mật khẩu"
            prefix={<KeyOutlined />}
            iconRender={checkRender}
          />
        </Form.Item>
      </Form>
      <div class="butonLogin">
        <button class="textLogin" onClick={actionRegister}>
          Xác nhận
        </button>
      </div>
      <div className="forGotPassWord">
        <span
          className="textForGotPassWord"
          onClick={() => {
            setCheckEmail(true);
            actionNavigation("login");
          }}
        >
          Quay lại đăng nhập
        </span>
      </div>
    </>
  );
  const componentRender = () => {
    switch (component) {
      case "login":
        return Login;
      case "checkOtp":
        return checkOtp;
      case "checkPassWord":
        return checkPassWord;
      case "register":
        return register;
      default:
        break;
    }
  };

  useEffect(() => {
    setTextTitle("ĐĂNG NHẬP");
    setValue("");
    setComponent("login");
    setCheckEmail(true);
  }, [show]);
  function actionLogin() {
    const data = form.getFieldsValue(true);
    form.validateFields().then((res) => {
      if (res?.errorFields?.length > 0) {
        return;
      }
      setLoading(true);
      callApi({
        method: HTTP_METHOD.POST,
        url: "api/login",
        data: data,
      }).then((res) => {
        if (res.status) {
          return messageError(res.message);
        }
        messageSuccess(res.message);
        dispatch(setInformation(res));
        setLoading(false);
        handleCancel();
      });
    });
  }
  function actionNavigation(text) {
    switch (text) {
      case "login":
        setTextTitle("ĐĂNG NHẬP");
        break;
      case "checkOtp":
        setTextTitle("NHẬP EMAIL ĐĂNG KÝ");
        break;
      case "checkPassWord":
        setTextTitle("NHẬP MẬT KHẨU");
        break;
      case "register":
        setTextTitle("ĐĂNG KÝ");
        break;
      default:
        break;
    }
    setComponent(text);
  }
  function confirmEmail(check) {
    setLoading(true);
    if (check) {
      callApi({
        url: "/authentificationotp",
        method: HTTP_METHOD.POST,
        data: { email: form.getFieldValue("userName"), otp: value },
      }).then((res) => {
        if (res.status) {
          setCheckEmail(false);
          return messageError(res.message);
        }
        setToken(res.token);
        messageSuccess(res.message);
        actionNavigation("checkPassWord");
        setLoading(false);
      });
      setCheckEmail(true);
    } else {
      form.validateFields().then((res) => {
        if (res?.errorFields?.length > 0) {
          return;
        }
        const email = form.getFieldValue("userName");
        callApi({
          url: "/resetPasswordRequest",
          method: HTTP_METHOD.POST,
          params: { email },
        }).then((res) => {
          if (res.status) {
            messageError(res.message);
            return;
          }
          messageSuccess(res.message);
          setTextTitle("XÁC NHẬN OTP");
          setCheckEmail(false);
          setLoading(false);
        });
      });
    }
  }
  function confirmPassWord() {
    setLoading(true);
    form.validateFields().then((res) => {
      if (res?.errorFields?.length > 0) {
        return;
      }
      callApi({
        url: "/resetPassword",
        method: HTTP_METHOD.POST,
        data: {
          newpassword: form.getFieldValue("password"),
          email: form.getFieldValue("email"),
          token: token,
        },
      }).then((res) => {
        if (res.status) {
          return messageError(res.message);
        }
        messageSuccess(`${res.message}, Vui lòng đăng nhập lại`);
        actionNavigation("login");
        setLoading(false);
      });
      setCheckEmail(true);
    });
  }
  function actionRegister() {
    const data = form.getFieldsValue(true);
    form.validateFields().then((res) => {
      if (res?.errorFields?.length > 0) {
        return;
      }
      callApi({
        url: "api/register",
        method: HTTP_METHOD.POST,
        data: data,
      }).then((res) => {
        if (res.status) {
          return messageError(res.message);
        }
        messageSuccess(`Thành công, Vui lòng đăng nhập lại`);
        actionNavigation("login");
        console.log(res);
      });
    });
  }

  return (
    <Modal
      open={show}
      onCancel={handleCancel}
      footer={[]}
      loading={loading}
      className="ModalClass"
      bodyStyle={{
        backgroundColor: "-webkit-linear-gradient(top, #7579ff, #b224ef)",
      }}
    >
      <>
        {/* Phần header */}
        <div className="containerLogin">
          <div className="Logo">
            <img className="logoImg" src={logo} alt="Lỗi nha" />
          </div>
          <div className="titleModal">
            <h2 className="textTiltle">{textTitle}</h2>
          </div>
          {componentRender()}
        </div>
      </>
    </Modal>
  );
}
