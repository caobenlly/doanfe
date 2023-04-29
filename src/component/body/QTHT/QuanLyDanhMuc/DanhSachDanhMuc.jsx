import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Pagination, Switch, Table } from "antd";
import { useEffect, useState } from "react";
import HTTP_METHOD from "../../../../api/method";
import callApi from "../../../../api/api";
import {
  converDate,
  messageError,
  messageSuccess,
} from "../../../../assets/comonFc";
import { cloneDeep } from "lodash";

function ModalEdit({ dataEdit, searchData, showModalEdit, closeModalEdit }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(false);

  const [id, setId] = useState();
  useEffect(() => {
    if (showModalEdit) {
      setName(dataEdit.name);
      setStatus(dataEdit.status);
      setId(dataEdit.id);
    }
  }, [dataEdit, showModalEdit]);

  function setData() {
    const data = { name, status };
    callApi({
      url: id ? `/api/admin/categories/${id}` : "/api/admin/categories",
      method: id ? HTTP_METHOD.PUT : HTTP_METHOD.POST,
      data,
    }).then((res) => {
      messageSuccess(id ? "Cập nhật thành công" : "Thêm mới thành công");
      searchData();
      closeModalEdit();
    });
    console.log(data);
  }
  return (
    <Modal
      open={showModalEdit}
      onOk={setData}
      onCancel={closeModalEdit}
      title="Sửa danh mục"
    >
      <div style={{ padding: "20px 0" }}>
        <Input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Nhập tên danh mục"
          size="large"
        ></Input>
      </div>
      <div>
        <span style={{ display: "block", padding: "20px 0" }}>
          Trang thái danh mục
        </span>
        <Switch
          checked={status}
          onChange={(e) => setStatus(e)}
          size="default"
        />
      </div>
    </Modal>
  );
}

export default function DanhSachDanhMuc() {
  const [dataEdit, setDataEdit] = useState({});
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [dataView, setDataView] = useState([]);
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
      title: "Tên danh mục",
      dataIndex: "name",
      key: "tenDm",
      alight: "right",
    },
    {
      title: "Trạng thái danh mục",
      dataIndex: "status",
      key: "statusDm",
      alight: "right",
      with: 80,
      render: (val, row, index) => <Switch checked={val} />,
    },
    {
      title: "Ngày tạo danh mục",
      dataIndex: "createdAt",
      key: "ngayTaoDm",
      alight: "right",
      render: (val) => (val ? converDate(val) : ""),
    },
    {
      title: "Ngày sửa danh mục",
      dataIndex: "modifiedAt",
      key: "ngaySuaDm",
      alight: "right",
      render: (val) => (val ? converDate(val) : ""),
    },
    {
      title: "Thao tác danh mục",
      dataIndex: "statusDm",
      key: "statusDm",
      render: (value, row, index) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{ cursor: "pointer" }}>
            <EditOutlined onClick={() => openModalEdit(row)} />
          </span>
          <span style={{ width: "20px" }}></span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(row.id)}
          >
            <DeleteOutlined />
          </span>
        </div>
      ),
    },
  ];
  function searchData() {
    callApi({
      url: "/api/admin/categories",
      method: HTTP_METHOD.GET,
    }).then((res) => {
      setData(res);
      setPage(1);
      setTotal(res.length);
    });
  }
  function handleDelete(id) {
    callApi({
      url: `/api/admin/categories/${id}`,
      method: HTTP_METHOD.DELETE,
    }).then((res) => {
      if (res.message) {
        messageError(res.message);
        return;
      }
      messageSuccess(res);
      searchData();
    });
  }
  useEffect(() => {
    searchData();
  }, []);
  useEffect(() => {
    const newData = cloneDeep(data).slice((page - 1) * 5, (page - 1) * 5 + 5);
    setDataView(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, data]);
  return (
    <>
      <div style={{ background: "white", padding: "15px" }}>
        <div className="titleTable" style={{ marginBottom: 20 }}>
          <b style={{ fontSize: "17px" }}>Danh sách danh mục</b>
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
              Thêm mới danh mục
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
          style={{ textAlign: "center", marginTop: "15px" }}
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
        searchData={searchData}
      />
    </>
  );
}
