/* eslint-disable react-hooks/exhaustive-deps */

import { Pagination, Table, Select, Modal } from "antd";
import { useState, useEffect } from "react";
import { converDate, messageSuccess } from "../../../../assets/comonFc";
import callApi from "../../../../api/api";
import HTTP_METHOD from "../../../../api/method";
import { cloneDeep } from "lodash";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function ModalEdit({
  dataEdit,
  searchData,
  showModalEdit,
  closeModalEdit,
  getData,
}) {
  const [setName] = useState("");
  const [setStatus] = useState(false);
  const [id, setId] = useState();
  const [trangThai, setTrangThai] = useState();
  const optionOrder = [
    {
      label: "Chờ lấy hàng",
      value: 1,
    },
    {
      label: "Đang giao hàng",
      value: 2,
    },
    {
      label: "Đã giao hàng",
      value: 3,
    },
    {
      label: "Đơn hàng bị trả lại",
      value: 4,
    },
    {
      label: "Đơn hàng bị hủy",
      value: 5,
    },
  ];
  useEffect(() => {
    if (showModalEdit) {
      setName(dataEdit.name);
      setStatus(dataEdit.status);
      setId(dataEdit.id);
      setTrangThai(dataEdit.trangThai);
    }
    console.log("dataEdit", dataEdit);
  }, [dataEdit, showModalEdit]);

  function setData() {
    console.log(trangThai, "trangThai");
    callApi({
      url: `/api/admin/orders/update-detail/${id}?trangThai=${trangThai}`,
      method: HTTP_METHOD.PUT,
    }).then((res) => {
      messageSuccess("Cập nhật thành công");
      getData();
      closeModalEdit();
    });
  }
  function handleChangeOrderStatus(e) {
    console.log(e);
    setTrangThai(e);
  }
  return (
    <Modal
      open={showModalEdit}
      onOk={setData}
      onCancel={closeModalEdit}
      title="Sửa đơn hàng"
    >
      <Select
        style={{ width: "100%" }}
        options={optionOrder}
        onChange={(e) => handleChangeOrderStatus(e)}
      />
    </Modal>
  );
}

export default function DanhSachDonHang() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [dataView, setDataView] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [showModalEdit, setShowModalEdit] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  function getData() {
    callApi({
      url: "/admin/orders",
      method: HTTP_METHOD.GET,
    }).then((res) => {
      setData(res);
      setPage(1);
      setTotal(res.length);
    });
  }
  useEffect(() => {
    const newData = cloneDeep(data).slice((page - 1) * 5, (page - 1) * 5 + 5);
    setDataView(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, data]);
  const status = [
    { key: 1, value: "Chờ lấy hàng", style: "#ed9c28" },
    { key: 2, value: "Đang giao hàng", style: "#cccccc" },
    { key: 3, value: "Đã giao hàng", style: "#47a447" },
    { key: 4, value: "Đơn hàng bị trả lại", style: "#d2322d" },
    { key: 5, value: "Đơn hàng bị hủy", style: "#000000" },
  ];
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      alight: "right",
    },
    {
      title: "Người nhận",
      dataIndex: "nguoiNhan",
      key: "tenDm",
      alight: "right",
    },
    {
      title: "Điện thoại",
      dataIndex: "dienThoai",
      key: "tenDm",
      alight: "right",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "statusDm",
      alight: "right",
      with: 80,
      render: (val) => {
        const dataRow = status.find((i) => +i.key === +val);
        return (
          <span style={{ color: "white", background: dataRow.style }}>
            {dataRow.value}
          </span>
        );
      },
    },
    {
      title: "Sản phẩm",
      dataIndex: "sanPham",
      key: "sanPham",
      alight: "right",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      key: "ngayTao",
      alight: "right",
      render: (val) => (val ? converDate(val) : ""),
    },
    {
      title: "Ngày sửa",
      dataIndex: "ngaySua",
      key: "ngaySua",
      alight: "right",
      render: (val) => (val ? converDate(val) : ""),
    },
    {
      title: "Thao tác",
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
  function openModalEdit(row) {
    setShowModalEdit(true);
    setDataEdit(row);
  }
  function handleDelete(id) {
    callApi({
      url: `/admin/orders/delete/${id}`,
      method: HTTP_METHOD.DELETE,
    }).then((res) => {
      messageSuccess(res);
      getData();
    });
  }
  return (
    <>
      <div style={{ background: "white", padding: "15px" }}>
        <div className="titleTable" style={{ marginBottom: 20 }}>
          <b style={{ fontSize: "17px" }}>Danh sách đơn hàng</b>
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
        getData={getData}
      />
    </>
  );
}
