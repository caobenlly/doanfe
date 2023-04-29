import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Button, Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import callApi from "../../../../api/api";
import HTTP_METHOD from "../../../../api/method";
import { useNavigate } from "react-router-dom";
import { messageError, messageSuccess } from "../../../../assets/comonFc";
import { cloneDeep } from "lodash";

export default function DanhSachKhuyenMai() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [dataView, setDataView] = useState([]);
  const status = [
    { key: true, value: "Công khai", style: "#47a447" },
    { key: false, value: " Ẩn", style: "#d2322d" },
  ];
  const status2 = [
    { key: true, value: "Kích hoạt", style: "#47a447" },
    { key: false, value: "Vô hiệu hóa", style: "#d2322d" },
  ];
  const columns = [
    {
      title: "Mã khuyến mãi",
      dataIndex: "couponCode",
      key: "tenDm",
      alight: "right",
    },
    {
      title: "Tên khuyễn mãi",
      dataIndex: "name",
      key: "tenDm",
      alight: "right",
    },
    {
      title: "Loại",
      dataIndex: "active",
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
      title: "Trạng thái",
      dataIndex: "public",
      key: "statusDm",
      alight: "right",
      with: 80,
      render: (val) => {
        const dataRow = status2.find((i) => +i.key === +val);
        return (
          <span style={{ color: "white", background: dataRow.style }}>
            {dataRow.value}
          </span>
        );
      },
    },
    {
      title: "Giá trị",
      dataIndex: "discountValue",
      key: "statusDm",
      alight: "right",
      with: 80,
    },
    {
      title: "Thao tác",
      dataIndex: "statusDm",
      key: "statusDm",
      render: (value, row, index) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{ cursor: "pointer" }}>
            <EditOutlined
              onClick={() => navigate(`/Admin/ThemMoiKhuyenMai?id=${row.id}`)}
            />
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
  function getData() {
    callApi({
      url: "/admin/promotions",
      method: HTTP_METHOD.GET,
    }).then((res) => {
      setData(res);
      setPage(1);
      setTotal(res.length);
    });
  }
  function handleDelete(id) {
    callApi({
      url: `/api/admin/promotions/${id}`,
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
  useEffect(() => {
    const newData = cloneDeep(data).slice((page - 1) * 5, (page - 1) * 5 + 5);
    setDataView(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, data]);
  return (
    <>
      <div style={{ background: "white", padding: "15px" }}>
        <div className="titleTable" style={{ marginBottom: 20 }}>
          <b style={{ fontSize: "17px" }}>Danh sách khuyến mãi</b>
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
              onClick={() => navigate("/Admin/ThemMoiKhuyenMai")}
              icon={<PlusOutlined />}
            >
              Thêm mới khuyến mãi
            </Button>
            <Button
              type="primary"
              style={{
                marginBottom: 16,
                marginRight: 20,
              }}
              icon={<RedoOutlined />}
            >
              Tải lại
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
    </>
  );
}
