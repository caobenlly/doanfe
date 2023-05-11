import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Pagination, Table } from "antd";
import { useState } from "react";
import {
  converDate,
  messageError,
  messageSuccess,
} from "../../../../assets/comonFc";
import { useEffect } from "react";
import callApi from "../../../../api/api";
import HTTP_METHOD from "../../../../api/method";
import { cloneDeep } from "lodash";
import { useNavigate } from "react-router-dom";

export default function DanhSachDonHang() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [dataView, setDataView] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  function getData() {
    callApi({
      url: "/admin/products",
      method: HTTP_METHOD.GET,
    }).then((res) => {
      console.log(res);
      const dataNew = [];
      res.forEach((item) => {
        const index = dataNew.findIndex((i) => i.maSanPham === item.maSanPham);
        if (index !== -1) {
          dataNew[index].danhMuc = `${dataNew[index].danhMuc}, ${item.danhMuc}`;
        } else {
          dataNew.push(item);
        }
      });
      setPage(1);
      setTotal(dataNew.length);
      setData(dataNew);
    });
  }
  useEffect(() => {
    const newData = cloneDeep(data).slice((page - 1) * 5, (page - 1) * 5 + 5);
    setDataView(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, data]);
  function handleDelete(id) {
    callApi({
      url: `/api/admin/products/${id}`,
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
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "maSanPham",
      key: "maSanPham",
      alight: "right",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      key: "tenSp",
      alight: "right",
    },
    {
      title: "Ảnh",
      dataIndex: "anhSanPham",
      key: "anh",
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
      title: "Nhãn hiệu",
      dataIndex: "nhanHieu",
      key: "nhanhieu",
      alight: "right",
      with: 80,
    },
    {
      title: "Danh mục",
      dataIndex: "danhMuc",
      key: "danhMuc",
      alight: "right",
    },
    {
      title: "Giá nhập",
      dataIndex: "giaNhap",
      key: "giaNhap",
      alight: "right",
    },
    {
      title: "Giá bán",
      dataIndex: "giaBan",
      key: "giaBan",
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
      title: "Đã bán",
      dataIndex: "daBan",
      key: "ngaySua",
      alight: "right",
    },
    {
      title: "Thao tác danh mục",
      dataIndex: "statusDm",
      key: "statusDm",
      render: (value, row, index) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(`/Admin/ThemMoiSanPham?id=${row.maSanPham}`)
            }
          >
            <EditOutlined />
          </span>
          <span style={{ width: "20px" }}></span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(row.maSanPham)}
          >
            <DeleteOutlined />
          </span>
        </div>
      ),
    },
  ];
  function handleDownload() {
    callApi({
      url: "/api/products/export/excel",
      method: HTTP_METHOD.GET,
    }).then((res) => {
      const byteString = window.atob(res);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: "" });
      const fileURL = window.URL.createObjectURL(blob);
      const fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute("download", "Danh Sách sản phẩm.xlsx");
      document.body.appendChild(fileLink);
      fileLink.click();
      fileLink.remove();
    });
  }
  return (
    <>
      <div style={{ background: "white", padding: "15px" }}>
        <div className="titleTable" style={{ marginBottom: 20 }}>
          <b style={{ fontSize: "17px" }}>Danh sách sản phẩm</b>
        </div>
        <div className="listThaotac">
          <Button
            type="primary"
            style={{
              marginBottom: 16,
              marginRight: 20,
            }}
            onClick={() => navigate("/Admin/ThemMoiSanPham")}
            icon={<PlusOutlined />}
          >
            Thêm mới sản phẩm
          </Button>
          <Button
            type="primary"
            style={{
              marginBottom: 16,
              marginRight: 20,
            }}
            onClick={handleDownload}
          >
            Kết Xuất
          </Button>
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
          ;
        </div>
      </div>
    </>
  );
}
