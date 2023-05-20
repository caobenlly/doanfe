/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Pagination, Switch, Table } from "antd";
import { useEffect, useState } from "react";
import ImageUpload from "../uploadImg";
import callApi from "../../../../api/api";
import HTTP_METHOD from "../../../../api/method";
import {
  converDate,
  messageError,
  messageSuccess,
} from "../../../../assets/comonFc";
import { cloneDeep } from "lodash";

function ModalEdit({ getData, showModalEdit, closeModalEdit, dataEdit }) {
  const [file, setFile] = useState({});
  const [name, setName] = useState({});
  const [showPopupImg, setShowPopupImg] = useState(false);
  const [status, setStatus] = useState(false);
  const [id, setId] = useState(0);
  function handelAdd() {
    const data = {
      name: name,
      status: status,
      thumbnail: file,
    };
    callApi({
      url: id ? `/api/admin/brands/${id}` : "/api/admin/brands",
      method: id ? HTTP_METHOD.PUT : HTTP_METHOD.POST,
      data,
    }).then((res) => {
      if (res.status) {
        messageError(res.message);
      } else {
        messageSuccess(id ? "Cập nhật thành công" : "Thêm mới thành công");
        getData();
        closeModalEdit();
      }
    });
  }
  useEffect(() => {
    if (showModalEdit) {
      setName(dataEdit.name);
      setFile(dataEdit.thumbnail);
      setStatus(dataEdit.status);
      setId(dataEdit.id);
    }
  }, [showModalEdit]);
  return (
    <>
      <Modal
        open={showModalEdit}
        onCancel={closeModalEdit}
        title="Thêm Nhãn Hiệu"
        onOk={handelAdd}
      >
        <div style={{ padding: "20px 0" }}>
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Nhập tên nhãn hiệu"
            size="large"
          ></Input>
        </div>
        <Button
          type="primary"
          style={{
            margin: "5px 0 15px",
          }}
          icon={<PlusOutlined />}
          onClick={() => setShowPopupImg(true)}
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
          <img src={file} alt="" style={{ width: "100%", height: "100%" }} />
        </div>
        <div>
          <span style={{ display: "block", padding: "10px 0" }}>
            Trang thái nhãn hiệu
          </span>
          <Switch
            checked={status}
            onChange={(e) => setStatus(e)}
            size="default"
          />
        </div>
      </Modal>
      <ImageUpload
        show={showPopupImg}
        closePreview={() => setShowPopupImg(false)}
        dataFile={(data) => setFile(data[0]?.src)}
        file={file}
        max={1}
      />
    </>
  );
}

export default function DanhSachDanhMuc() {
  const [dataEdit, setDataEdit] = useState({});
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [dataView, setDataView] = useState([]);
  const [data, setData] = useState([]);
  function openModalEdit(row) {
    setShowModalEdit(true);
    setDataEdit(row);
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      alight: "right",
    },
    {
      title: "Tên nhãn hiệu",
      dataIndex: "name",
      key: "tenDm",
      alight: "right",
    },
    {
      title: "Ảnh nhãn hiệu",
      dataIndex: "thumbnail",
      key: "tenDm",
      alight: "right",
      render: (val, row, index) => (
        <img
          style={{ width: "150px", height: "100px" }}
          src={val}
          alt={"error"}
        />
      ),
    },
    {
      title: "Trạng thái nhãn hiệu",
      dataIndex: "status",
      key: "statusDm",
      alight: "right",
      with: 80,
      render: (val, row, index) => <Switch checked={val} />,
    },
    {
      title: "Ngày tạo nhãn hiệu",
      dataIndex: "createdAt",
      key: "ngayTaoDm",
      alight: "right",
      render: (val) => (val ? converDate(val) : ""),
    },
    {
      title: "Ngày sửa nhãn hiệu",
      dataIndex: "modifiedAt",
      key: "ngaySuaDm",
      alight: "right",
      render: (val) => (val ? converDate(val) : ""),
    },
    {
      title: "Thao tác nhãn hiệu",
      dataIndex: "statusDm",
      key: "statusDm",
      render: (value, row, index) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{ cursor: "pointer" }}>
            <EditOutlined onClick={() => openModalEdit(row)} />
          </span>
          <span style={{ width: "20px" }}></span>
          <span style={{ cursor: "pointer" }}>
            <DeleteOutlined onClick={() => handleDelete(row.id)} />
          </span>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const newData = cloneDeep(data).slice((page - 1) * 5, (page - 1) * 5 + 5);
    setDataView(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, data]);
  function getData() {
    callApi({
      url: "/admin/brands",
      method: HTTP_METHOD.GET,
    }).then((res) => {
      setPage(1);
      setTotal(res.brands.length);
      setData(res.brands);
    });
  }
  function handleDelete(id) {
    callApi({
      url: `/api/admin/brands/${id}`,
      method: HTTP_METHOD.DELETE,
    }).then((res) => {
      if (res.message) {
        messageError(res.message);
        return;
      }
      getData();
      messageSuccess(res);
    });
  }
  return (
    <>
      <div style={{ background: "white", padding: "15px" }}>
        <div className="titleTable" style={{ marginBottom: 20 }}>
          <b style={{ fontSize: "17px" }}>Danh sách nhãn hiệu</b>
        </div>
        <div
          className="listThaotac"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="buttonLeft">
            <Button
              type="primary"
              style={{
                marginBottom: 16,
                marginRight: 20,
              }}
              onClick={openModalEdit}
              icon={<PlusOutlined />}
            >
              Thêm mới nhãn hiệu
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={dataView}
          bordered
          pagination={false}
        />
        <div
          className="pagiantion"
          style={{ textAlign: "center", margin: " 15px 0 50px" }}
        >
          <Pagination
            onChange={(e) => setPage(e)}
            current={page}
            total={total}
            pageSize={5}
          />
        </div>
      </div>
      <ModalEdit
        showModalEdit={showModalEdit}
        dataEdit={dataEdit}
        closeModalEdit={() => setShowModalEdit(false)}
        getData={() => getData()}
      />
    </>
  );
}
