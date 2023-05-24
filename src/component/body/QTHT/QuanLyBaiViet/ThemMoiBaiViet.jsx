/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Button, Form, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CKEditorTable from "../TableEdit";
import Input from "antd/es/input/Input";
import ImageUpload from "../uploadImg";
import callApi from "../../../../api/api";
import HTTP_METHOD from "../../../../api/method";
import { messageError, messageSuccess } from "../../../../assets/comonFc";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function ThemMoiBaiViet() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [file, setFile] = useState({});
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    id &&
      callApi({
        url: `/admin/posts/${id}`,
        ethod: HTTP_METHOD.GET,
      }).then((res) => {
        res = res.post;
        const data = {
          title: res.title,
          status: res.status,
        };
        setFile({ src: res.thumbnail });
        setValue(res.description);
        form.setFieldsValue(data);
      });
  }, []);

  function handelSave() {
    form.validateFields().then((res) => {
      if (res?.errorFields?.length > 0) {
        return;
      }
      const list = form.getFieldsValue(true);
      list.description = value;
      if(!file?.src?.length && list.status === 1){
        return messageError('Vui lòng thêm ảnh')
      }
      list.image = file?.src;
      callApi({
        url: id ? `/api/admin/posts/${id}` : "/api/admin/posts",
        method: id ? HTTP_METHOD.PUT : HTTP_METHOD.POST,
        data: list,
      }).then((response) => {
        if (response.message) {
          messageError(response.message);
          return;
        }
        messageSuccess(response);
        navigate("/Admin/DanhSachBaiViet");
      });
    });
  }

  return (
    <>
      <div style={{ background: "white", padding: "15px" }}>
        <div className="titleTable" style={{ marginBottom: 20 }}>
          <b style={{ fontSize: "17px" }}>
            {id ? "Cập nhật bài viết" : "Thêm mới bài viết"}
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
            {id ? "Cập nhật bài viết" : "Thêm mới bài viết"}
          </Button>
        </div>
        <div className="containerContent">
          <div className="tableContent">
            <Form form={form}>
              <div>Tiêu đề bài viết :</div>
              <Form.Item
                name="title"
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
          </div>
          <div className="tableInfo">
            <Form form={form}>
              <div>Trạng thái bài viết:</div>
              <Form.Item name="status">
                <Select
                  defaultValue="Nháp"
                  options={[
                    {
                      label: "Nháp",
                      value: 0,
                    },
                    {
                      label: "Công khai",
                      value: 1,
                    },
                  ]}
                />
              </Form.Item>
            </Form>
            <Button
              type="primary"
              style={{
                margin: "5px 0 15px",
              }}
              icon={<PlusOutlined />}
              onClick={() => setShow(true)}
            >
              Thêm ảnh
            </Button>
            <div
              style={{
                height: "300px",
                border: "1px solid",
                cursor: "pointer",
              }}
              className="imgSp"
            >
              <img
                src={file?.src}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
      <ImageUpload
        show={show}
        closePreview={() => setShow(false)}
        dataFile={(data) => setFile(...data)}
        file={file}
        max={1}
      />
    </>
  );
}
