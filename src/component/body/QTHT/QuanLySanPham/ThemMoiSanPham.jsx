/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Form, InputNumber, List, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CKEditorTable from "../TableEdit";
import Input from "antd/es/input/Input";
import ImageUpload from "../uploadImg";
import callApi from "../../../../api/api";
import HTTP_METHOD from "../../../../api/method";
import { useNavigate, useSearchParams } from "react-router-dom";
import { messageError, messageSuccess } from "../../../../assets/comonFc";

export default function ThemMoiSanPham() {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [file, setFile] = useState([]);
  const [listNhanHieu, setListNhanHieu] = useState([]);
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    getData();
    if (id) {
      callApi({
        url: `/api/admin/products/${id}`,
        method: HTTP_METHOD.GET,
      }).then((res) => {
        const inFo = {
          name: res.tenSanPham,
          status: res.status,
          brandId: res.nhanHieuId,
          categoryIds: res.danhMuc,
          price: res.giaNhap,
          salePrice: res.giaBan,
        };
        const files = res.anhSanPham.map((i) => ({
          src: i,
        }));
        setFile(files);
        form.setFieldsValue(inFo);
        setValue(res.description);
        console.log(res);
      });
    }
  }, []);
  function getData() {
    callApi({
      url: "/admin/brands",
      method: HTTP_METHOD.GET,
    }).then((res) => {
      setListNhanHieu(
        res.brands.map((i) => {
          const item = {
            value: i.id,
            label: i.name,
          };
          return item;
        })
      );
    });
  }
  function listCustom(listItem) {
    return (
      <List
        size="small"
        grid={{
          gutter: 16,
          column: 5,
        }}
        dataSource={listItem}
        renderItem={(item) => (
          <List.Item style={{ height: "100px", width: "800px", padding: "0" }}>
            <div
              style={{
                height: "100px",
                border: "1px solid",
                cursor: "pointer",
              }}
              className="imgSp"
            >
              <img
                src={item.src}
                alt="lỗi"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </List.Item>
        )}
      />
    );
  }
  function handelSave() {
    form.validateFields().then((res) => {
      if (res?.errorFields?.length > 0) {
        return;
      }
      const list = form.getFieldsValue(true);
      list.description = value;
      list.price = +list.price;
      list.salePrice = +list.salePrice;
      list.images = file.map((i) => i.src);

      callApi({
        url: id ? `/api/admin/products/${id}` : "/api/admin/products",
        method: id ? HTTP_METHOD.PUT : HTTP_METHOD.POST,
        data: list,
      }).then((response) => {
        if (response.message) {
          messageError(response.message);
          return;
        }
        messageSuccess(response);
        navigate("/Admin/DanhSachSanPham");
      });
    });
  }

  return (
    <>
      <div
        style={{ background: "white", padding: "15px", marginBottom: "20px" }}
      >
        <div className="titleTable" style={{ marginBottom: 20 }}>
          <b style={{ fontSize: "17px" }}>
            {id ? "Cập nhật sản phẩm" : "Thêm mới sản phẩm"}
          </b>
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
            {id ? "Cập nhật sản phẩm" : "Thêm mới sản phẩm"}
          </Button>
        </div>
        <div className="containerContent">
          <div className="tableContent">
            <Form form={form}>
              <div>Tên sản phẩm :</div>
              <Form.Item
                name="name"
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
            <CKEditorTable value={value} setValue={setValue} />
            <div className="listThaotac">
              <Button
                type="primary"
                style={{
                  marginTop: 15,
                }}
                icon={<PlusOutlined />}
                onClick={() => setShow(true)}
              >
                Thêm ảnh
              </Button>
            </div>
            <div className="listCustom">{listCustom(file)}</div>
          </div>
          <div className="tableInfo">
            <Form form={form}>
              <div>Trạng thái :</div>
              <Form.Item name="status">
                <Select
                  defaultValue={1}
                  options={[
                    {
                      label: "Mở bán",
                      value: 1,
                    },
                    {
                      label: "Không bán",
                      value: 0,
                    },
                  ]}
                />
              </Form.Item>
              <div>Nhãn hiệu sản phẩm :</div>
              <Form.Item
                name="brandId"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập",
                  },
                ]}
              >
                <Select
                  defaultValue={listNhanHieu[0]?.value}
                  options={listNhanHieu}
                />
              </Form.Item>
              <div>Danh mục sản phẩm :</div>
              <Form.Item
                name="categoryIds"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  options={[
                    {
                      label: "Giày nam",
                      value: 1,
                    },
                    {
                      label: "Giày nữ",
                      value: 2,
                    },
                    {
                      label: "Giày trẻ em",
                      value: 3,
                    },
                  ]}
                />
              </Form.Item>
              <div>Giá gốc sản phẩm (VNĐ) :</div>
              <Form.Item
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập",
                  },
                ]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                  controls={false}
                />
              </Form.Item>
              <div>Giá bán ra của sản phẩm (VNĐ) :</div>
              <Form.Item
                name="salePrice"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập",
                  },
                ]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                  controls={false}
                />
              </Form.Item>
              <div>Size :</div>
              <Form.Item
                name="listSize"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  options={[
                    {
                      label: "35",
                      value: 35,
                    },
                    {
                      label: "36",
                      value: 36,
                    },
                    {
                      label: "37",
                      value: 37,
                    },
                    {
                      label: "38",
                      value: 38,
                    },
                    {
                      label: "39",
                      value: 39,
                    },
                    {
                      label: "40",
                      value: 40,
                    },
                    {
                      label: "41",
                      value: 41,
                    },
                    {
                      label: "42",
                      value: 42,
                    },
                  ]}
                />
              </Form.Item>
              <div>Số lượng:</div>
              <Form.Item
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập",
                  },
                ]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                  controls={false}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
        <ImageUpload
          show={show}
          closePreview={() => setShow(false)}
          dataFile={(data) => setFile(data)}
          file={file}
        />
      </div>
    </>
  );
}
