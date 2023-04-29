/* eslint-disable react-hooks/exhaustive-deps */
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
} from "antd";
import { useEffect, useState } from "react";
import callApi from "../../../../api/api";
import { messageError, messageSuccess } from "../../../../assets/comonFc";
import { useNavigate, useSearchParams } from "react-router-dom";
import HTTP_METHOD from "../../../../api/method";
import moment from "moment/moment";
export default function ThemMoiKhuyenMai() {
  const [is_public, setIsPublic] = useState(false);
  const [active, setActive] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    id &&
      callApi({
        url: `/admin/promotions/update/${id}`,
        method: HTTP_METHOD.GET,
      }).then((res) => {
        const response = res.promotion;
        const date = new Date(response.expiredAt).toISOString();
        console.log(date);
        const data = {
          code: response.couponCode,
          name: response.name,
          active: response.active,
          discount_type: response.discountType,
          discount_value: response.discountValue,
          is_public: response.public,
          expired_date: moment(date),
        };
        form.setFieldsValue(data);
        setActive(data.active);
        setIsPublic(data.public);
      });
  }, []);
  function handelSave() {
    form.validateFields().then((res) => {
      if (res?.errorFields?.length > 0) {
        return;
      }
      const list = form.getFieldsValue(true);
      list.active = active;
      list.is_public = is_public;
      console.log(list.expired_date);
      callApi({
        url: !id ? "/api/admin/promotions" : `/api/admin/promotions/${id}`,
        method: !id ? HTTP_METHOD.POST : HTTP_METHOD.PUT,
        data: list,
      }).then((response) => {
        if (response.status) {
          messageError(response.message);
          return;
        } else {
          const text = !id ? "Thêm thành công" : "Cập nhật thành công";
          messageSuccess(text);
          navigate("/Admin/DanhSachKhuyenMai");
        }
      });
    });
  }
  return (
    <div style={{ background: "white", padding: "15px" }}>
      <div className="titleTable" style={{ marginBottom: 20 }}>
        <b style={{ fontSize: "17px" }}>Danh sách danh mục</b>
      </div>
      <div className="listThaotac">
        <Button
          type="primary"
          style={{
            marginBottom: 16,
            marginRight: 20,
          }}
          icon={<PlusOutlined />}
          onClick={handelSave}
        >
          {!id ? "Thêm mới Khuyến mãi" : "Cập nhật khuyễn mãi"}
        </Button>
      </div>
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
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <h2 style={{ marginLeft: "15px" }}>Phiếu khuyễn mãi</h2>
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
            <Form.Item
              label="Mã Code"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên chương trình"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Khuyễn mãi theo" name="discount_type">
              <Select
                defaultValue="Phần trăm (%)"
                options={[
                  {
                    label: "Phần trăm (%)",
                    value: 1,
                  },
                  {
                    label: "Khoản tiền trực tiếp",
                    value: 2,
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Mức giảm"
              name="discount_value"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Ngày hết hạn"
              name="expired_date"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
            >
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div className="leftSwith">
                <span>Công khai khuyến mãi: </span>
                <Switch checked={active} onChange={(e) => setActive(e)} />
              </div>
              <div className="rightSwith">
                <span>Kích hoạt khuyến mãi: </span>
                <Switch checked={is_public} onChange={(e) => setIsPublic(e)} />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
