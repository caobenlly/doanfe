import { Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import callApi from "../../../../api/api";
import HTTP_METHOD from "../../../../api/method";
import { converDate } from "../../../../assets/comonFc";
import { cloneDeep } from "lodash";

export default function DanhSachTaiKhoan() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [dataView, setDataView] = useState([]);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "tenDm",
      alight: "right",
    },
    {
      title: "Tên",
      dataIndex: "fullName",
      key: "tenDm",
      alight: "right",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "statusDm",
      alight: "right",
      with: 80,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "ngayTaoDm",
      alight: "right",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "ngaySuaDm",
      alight: "right",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "ngaySuaDm",
      alight: "right",
      render: (val) => (val ? converDate(val) : ""),
    },
  ];
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const newData = cloneDeep(data).slice((page - 1) * 5, (page - 1) * 5 + 5);
    setDataView(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  function getData() {
    callApi({
      url: "/admin/users",
      method: HTTP_METHOD.GET,
    }).then((res) => {
      setData(res);
      setPage(1);
      setTotal(res.length);
    });
  }
  return (
    <>
      <div style={{ background: "white", padding: "15px" }}>
        <div className="titleTable" style={{ marginBottom: 20 }}>
          <b style={{ fontSize: "17px" }}>Quản lý tài khoản</b>
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
