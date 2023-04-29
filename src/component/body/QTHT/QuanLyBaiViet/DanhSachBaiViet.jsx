import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import callApi from "../../../../api/api";
import HTTP_METHOD from "../../../../api/method";
import {
  converDate,
  messageError,
  messageSuccess,
} from "../../../../assets/comonFc";
import { useNavigate } from "react-router-dom";
import { cloneDeep } from "lodash";

export default function DanhSachBaiViet() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [dataView, setDataView] = useState([]);
  const navigate = useNavigate();
  const columns = [
    {
      title: "Tên bài viết",
      dataIndex: "title",
      key: "tenDm",
      alight: "right",
    },
    {
      title: "Ảnh",
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "statusDm",
      alight: "right",
      with: 80,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "ngayTaoDm",
      alight: "right",
      render: (val) => (val ? converDate(val) : ""),
    },
    {
      title: "Ngày sửa",
      dataIndex: "modifiedAt",
      key: "ngaySuaDm",
      alight: "right",
      render: (val) => (val ? converDate(val) : ""),
    },
    {
      title: "Thao tác",
      dataIndex: "statusDm",
      key: "statusDm",
      render: (value, row, index) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/Admin/ThemMoiBaiViet?id=${row.id}`)}
          >
            <EditOutlined />
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
      url: "/admin/posts",
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
  function handleDelete(id) {
    callApi({
      url: `/api/admin/posts/${id}`,
      method: HTTP_METHOD.DELETE,
    }).then((res) => {
      console.log(res.message);
      if (res.message) {
        messageError(res.message);
        return;
      }
      messageSuccess(res);
      getData();
    });
  }
  return (
    <>
      <div style={{ background: "white", padding: "15px" }}>
        <div className="titleTable" style={{ marginBottom: 20 }}>
          <b style={{ fontSize: "17px" }}>Danh sách bài viết</b>
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
              onClick={() => navigate("/Admin/ThemMoiBaiViet")}
              icon={<PlusOutlined />}
            >
              Thêm mới bài viết
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={dataView}
          pagination={false}
          bordered
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
