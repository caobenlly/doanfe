/* eslint-disable react-hooks/exhaustive-deps */

import { CaretDownOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, List, Modal, Radio, Table, Tabs } from "antd";
import { useState, useEffect } from "react";
import callApi from "./../../../api/api";
import HTTP_METHOD from "../../../api/method";
import { useSearchParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import CKEditorTable from "../QTHT/TableEdit";
import CheckoutForm from "./ThanhToan";
import TextArea from "antd/es/input/TextArea";
import ImageUpload from "../QTHT/uploadImg";
import { useSelector } from "react-redux";
import { messageError } from "../../../assets/comonFc";
import { SlideImages } from "../../../assets/comonCpn";

const dataSize = [
  { vn: 35, us: 2.5, cm: 21.3 },
  { vn: 36, us: 3.5, cm: 22.2 },
  { vn: 37, us: 4.5, cm: 23 },
  { vn: 38, us: 5.5, cm: 23.8 },
  { vn: 39, us: 6.5, cm: 24.6 },
  { vn: 40, us: 7.5, cm: 25.4 },
  { vn: 41, us: 8.5, cm: 26.2 },
  { vn: 42, us: 9.5, cm: 27.1 },
];
const newDataSize = dataSize.map((item) => {
  return {
    key: item.vn,
    value: `${item.vn}VN | ${item.us}US | ${item.cm}CM`,
  };
});
export function ModalSize({ show, setShow, menuSize, setSize }) {
  const [value, setValue] = useState("");
  const columns = Object.keys(dataSize[0]).map((key) => ({
    title: key.toUpperCase(),
    dataIndex: key,
    key: key,
    height: 25,
  }));
  return (
    <Modal
      open={show}
      onOk={() => {
        const item = newDataSize.find((key) => +key.key === +value);
        console.log(item);
        setSize(item);
        setShow(false);
      }}
      onCancel={() => setShow(false)}
      title={"Bảng chọn size"}
    >
      <Radio.Group
        options={menuSize}
        optionType="button"
        buttonStyle="solid"
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="tableSize" style={{ paddingTop: "10px" }}>
        <b>Thông tin chi tiết</b>
        <Table dataSource={dataSize} columns={columns} pagination={false} />
      </div>
    </Modal>
  );
}
export default function ThongtinSp() {
  const [show, setShow] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [canBuy, setCanBuy] = useState("");
  const [imgView, setImgView] = useState("");
  const [valueComment, setValueComment] = useState("");
  const [data, setData] = useState({});
  const [size, setSize] = useState({});
  const [dataRelate, setDataRelate] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [showThanhToan, setShowThanhToan] = useState(false);
  const [fileView, setFileView] = useState([]);
  const [file, setFile] = useState([]);
  const infor = useSelector((state) => state.userInfor.information);

  const [menuSize, setMenuSize] = useState([
    {
      label: "36",
      value: "36",
    },
    {
      label: "37",
      value: "37",
    },
    {
      label: "38",
      value: "38",
    },
    {
      label: "39",
      value: "39",
    },
    {
      label: "40",
      value: "40",
    },
    {
      label: "41",
      value: "41",
    },
    {
      label: "42",
      value: "42",
    },
    {
      label: "43",
      value: "43",
    },
  ]);
  useEffect(() => {
    callApi({
      url: `home/${id}`,
      method: HTTP_METHOD.GET,
    }).then((res) => {
      setDataRelate(res.relatedProducts);
      setData(res.product);
      setImgView(res.product.productImages);
      const newMenuSize = cloneDeep(menuSize).map((item) => {
        if (!res.availableSizes.includes(+item.value)) {
          item.disabled = true;
        }
        return item;
      });
      setMenuSize(newMenuSize);
      const item = newDataSize.find(
        (key) => +key.key === +res.availableSizes[0]
      );
      setSize(item);
      let text;
      if (res.canBuy) {
        text = "Còn Hàng";
      } else {
        text = "Hết hàng";
      }
      setFileView(res.product.feedbackImages);
      setCanBuy(text);
      getApiComment();
    });
  }, [id]);
  function handleFeedbak() {
    const fileEdit = file.map((i) => i.src);
    if (!infor.id) {
      messageError("Vui lòng đăng nhập để sử dụng");
      return;
    }
    const data = file.map((i) => i.src);
    callApi({
      url: `/api/products/${id}/update-feedback-image`,
      method: HTTP_METHOD.PUT,
      data: { feedback_images: [...fileEdit, ...data] },
    });
  }
  function handelComment() {
    if (!infor.id) {
      messageError("Vui lòng đăng nhập để sử dụng");
      return;
    }
    callApi({
      url: `/api/comments/post/${id}`,
      method: HTTP_METHOD.POST,
      data: {
        content: valueComment,
        userId: infor.id,
      },
    }).then((res) => {
      if (res.message) {
        messageError(res?.message);
        return;
      }
      getApiComment();
    });
  }
  function getApiComment() {
    callApi({
      url: `/home/listcomment/${id}`,
      method: HTTP_METHOD.GET,
    }).then((res) => {
      setListValueComment(res?.Listcomment);
    });
  }
  const [listValueComment, setListValueComment] = useState([]);
  const menu = [
    {
      key: 1,
      label: "Mô Tả Chi Tiết Sản Phẩm",
      children: (
        <CKEditorTable
          value={data?.description}
          setValue={(e) => console.log(e)}
          isChiTiet={true}
        />
      ),
    },
    {
      key: 2,
      label: "Hình Ảnh Feedback",
      children: (
        <div
          style={{
            border: "1px solid",
            maxHeight: "400px",
            minHeight: "400px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              border: "1px solid #dddddd",
              minWidth: "600px",
              margin: "35px 10px",
              display: "flex",
              flexWrap: "wrap",
              overflow: "auto",
            }}
          >
            {fileView?.map((i) => (
              <img
                style={{ width: "45%", height: "300px", marginRight: "20px" }}
                src={i}
                alt=""
              />
            ))}
          </div>
          <div
            className="uploadAnh"
            style={{
              maxWidth: "1000px",
              minWidth: "600px",
              backgroundColor: "#f4f4f4",
              margin: "35px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "0 20px 10px",
              flexDirection: "column",
            }}
          >
            <Button
              type="primary"
              style={{
                marginTop: 15,
              }}
              icon={<PlusOutlined />}
              onClick={() => setShowFile(true)}
            >
              Thêm ảnh
            </Button>
            <div className="listCustom">{listCustom2(file)}</div>
            <Button
              style={{ background: "black", color: "white", marginTop: "10px" }}
              onClick={handleFeedbak}
            >
              Gửi ảnh Feedback
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: 3,
      label: "Đánh Giá Sản Phẩm",
      children: (
        <div
          style={{
            border: "1px solid",
            maxHeight: "400px",
            minHeight: "400px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              border: "1px solid #dddddd",
              width: "600px",
              margin: "35px 10px", overflow:"auto"
            }}
          >
            {listValueComment?.map((i) => (
              <div
                className="commen"
                style={{ display: "flex", margin: "5px", fontSize: "14px" }}
              >
                <span style={{ color: "blue", textDecoration: "underline" }}>
                  {i.user} :
                </span>
                <span>{i.content}</span>
              </div>
            ))}
          </div>
          <div
            className="uploadAnh"
            style={{
              minWidth: "600px",
              backgroundColor: "#f4f4f4",
              margin: "35px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "0 20px 10px",
              flexDirection: "column",
            }}
          >
            <h3>Viết bình luận</h3>
            <TextArea
              autoSize={{
                minRows: 8,
              }}
              onChange={(e) => setValueComment(e.target.value)}
            />
            <Button
              style={{ background: "black", color: "white", marginTop: "10px" }}
              onClick={handelComment}
            >
              Gửi bình luận
            </Button>
          </div>
        </div>
      ),
    },
  ];
  function listCustom2(listItem) {
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
          <List.Item
            style={{
              height: "100px",
              width: "150px",
              padding: "0",
              minWidth: "150px",
            }}
          >
            <div
              style={{
                height: "100px",
                border: "1px solid",
                cursor: "pointer",
              }}
              className="imgSp"
              onClick={() => {
                setImgView(item);
              }}
            >
              <img
                src={item}
                alt="lỗi"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </List.Item>
        )}
      />
    );
  }
  function handleThanhToan() {
    if (!infor.id) {
      messageError("Vui lòng đăng nhập để sử dụng");
      return;
    }
    if (!size) {
      messageError("Đã hết sản phẩm");
      return;
    }
    setShowThanhToan(true);
  }
  return (
    <>
      <div className="containerThongtinSanPham">
        <div className="imgSanPham">
          <div className="dataSanPham">
            <img
              className="imgZoom"
              style={{ width: "100%", height: "100%", borderRadius: "20px" }}
              src={imgView}
              alt="lỗi"
            />
          </div>
          <div className="listCustom">{listCustom(data?.productImages)}</div>
        </div>
        <div className="inforSanPham">
          <div className="titleSanPham">{data.name}</div>
          <div className="inforChitiet">
            Giá Sản Phẩm :{" "}
            <b
              style={{
                color: "#08C",
                fontSize: "30px",
                fontWeight: "600",
                marginLeft: "20px",
              }}
            >
              {(+data.price).toLocaleString("vi-VN")}
            </b>
            đ
          </div>
          <div className="inforChitiet">
            Đã bán:{" "}
            <span
              style={{ marginLeft: "10px", fontSize: "20px", color: "black" }}
            >
              {data.totalSold} đôi
            </span>
          </div>
          <div className="inforChitiet">
            Tình trạng :{" "}
            <span
              style={{
                marginLeft: "10px",
                fontSize: "20px",
                color: "black",
              }}
            >
              {canBuy}
            </span>
          </div>
          <div
            className="inpuSelectSize"
            onClick={() => {
              setShow(true);
            }}
          >
            <span className="dataTitleSize">SIZE</span>
            <span className="dataSize">{size?.value}</span>
            <span>
              <CaretDownOutlined />
            </span>
          </div>
          <div className="buttonMuaHang" onClick={handleThanhToan}>
            <div className="inforGiaUuDai">
              <div className="titleGia">
                <b
                  style={{
                    fontSize: "30px",
                    fontWeight: "600",
                    marginLeft: "20px",
                  }}
                >
                  {(+data.price).toLocaleString("vi-VN")}
                </b>
                đ
              </div>
            </div>
            <div className="textMua">MUA NGAY</div>
          </div>
        </div>
      </div>
      <div className="menuSanPham">
        <Tabs defaultActiveKey="1" items={menu} />
      </div>
      <div
        className="listNew"
        style={{
          padding: "0 100px",
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="titleSpNew" style={{ textAlign: "center" }}>
          <h2 className="">
            <span>SẢN PHẨM LIÊN QUAN</span>
          </h2>
        </div>
        <div>
          <div>{SlideImages(dataRelate)}</div>
        </div>
      </div>

      <ModalSize
        show={show}
        setShow={setShow}
        menuSize={menuSize}
        setSize={setSize}
      />
      <ImageUpload
        show={showFile}
        closePreview={() => setShowFile(false)}
        dataFile={(data) => setFile(data)}
        file={file}
      />
      {showThanhToan && (
        <CheckoutForm
          show={showThanhToan}
          closeModal={() => setShowThanhToan(false)}
          menuSize={menuSize}
          sizeCheck={size}
          data={data}
        />
      )}
    </>
  );
}
