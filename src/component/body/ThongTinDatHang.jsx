/* eslint-disable react-hooks/exhaustive-deps */
import { List, Modal, Tabs } from "antd";
import { useEffect, useState } from "react";
import callApi from "../../api/api";
import HTTP_METHOD from "../../api/method";
import { messageError, messageSuccess } from "../../assets/comonFc";

function ModalChiTiet({ show, closePreview, id }) {
  const [data, setData] = useState({});
  const [img, setImg] = useState();
  useEffect(() => {
    show &&
      callApi({
        url: `/tai-khoan/lich-su-giao-dich/${id}`,
        method: HTTP_METHOD.GET,
      }).then((res) => {
        setData(res.order);
        setImg(res.order.productImg[0]);
      });
  }, [show]);
  function huyDonHang() {
    callApi({
      url: `/api/cancel-order/${id}`,
      method: HTTP_METHOD.POST,
    }).then((res) => {
      if (res.message) {
        messageError(res.message);
        return;
      }
      messageSuccess("Hủy đơn hàng hàng thành công");
      closePreview(true);
    });
  }
  return (
    <>
      <Modal
        title="Thông tin đơn hàng"
        open={show}
        onCancel={closePreview}
        width={800}
        footer={[null]}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div className="titleOder">
              Tên sản phẩm: <b>{data.productName}</b>
            </div>
            <img style={{ width: "200px", height: "200px" }} src={img} alt="" />
          </div>
          <div style={{ marginTop: "40px" }}>
            <div>
              <b>sizeVn:</b> {data.sizeVn} | <b>sizeUs:</b>
              {data.sizeUs} | <b>sizeCm:</b>
              {data.sizeUs}
            </div>
            <div className="titleOder">
              <b>Giá:</b> {data.totalPrice}
            </div>
            <div className="titleOder">
              <b>Tên Người Nhận:</b> {data.receiverName}
            </div>
            <div className="titleOder">
              <b>SĐT:</b> {data.receiverPhone}
            </div>
            <div className="titleOder">
              <b>Địa Chỉ:</b> {data.receiverAddress}
            </div>
            <div className="titleOder">
              <b>Tình trạng thái:</b> {data.statusText}
            </div>
          </div>
          <div style={{}}>
            <button
              onClick={huyDonHang}
              style={{
                padding: "10px 20px",
                backgroundColor: "#1677FF",
                border: "none",
                outline: "none",
                color: "white",
                height: "50px",
                marginTop: "170px",
              }}
            >
              Hủy đơn hàng
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default function LichSuDatHang() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [id, setId] = useState(0);
  const [show, setShow] = useState(0);
  useEffect(() => {
    callApi({
      url: "/tai-khoan/lich-su-giao-dich",
      method: HTTP_METHOD.GET,
    }).then((res) => {
      setData1(res.orderList.filter((i) => +i.status === 1));
      setData2(res.orderList.filter((i) => +i.status === 2));
      setData3(res.orderList.filter((i) => +i.status === 3));
      setData4(res.orderList.filter((i) => +i.status === 4));
      setData5(res.orderList.filter((i) => +i.status === 5));
    });
  }, []);
  const menu = [
    {
      key: 1,
      label: <h3>Chờ lấy hàng</h3>,
      children: (
        <List
          itemLayout="horizontal"
          dataSource={data1}
          renderItem={(item, index) => (
            <List.Item
              style={{ border: "1px solid #dddddd", cursor: "pointer" }}
              onClick={() => {
                setShow(true);
                setId(item.id);
              }}
            >
              <div>
                {" "}
                <span style={{ color: "blue" }}>#{item.id}</span>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    style={{ width: "150px", height: "200px" }}
                    src={item.productImg[0]}
                    alt=""
                  />
                  <div
                    style={{
                      margin: "0 15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <b>{item.productName}</b>
                    </div>
                    <div>
                      sizeVn: {item.sizeVn} | sizeUs:{item.sizeUs} | sizeCm:
                      {item.sizeUs}
                    </div>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 2,
      label: <h3>Đang giao hàng</h3>,
      children: (
        <List
          itemLayout="horizontal"
          dataSource={data2}
          renderItem={(item, index) => (
            <List.Item
              style={{ border: "1px solid #dddddd", cursor: "pointer" }}
              onClick={() => {
                setShow(true);
                setId(item.id);
              }}
            >
              <div>
                {" "}
                <span style={{ color: "blue" }}>#{item.id}</span>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    style={{ width: "150px", height: "200px" }}
                    src={item.productImg[0]}
                    alt=""
                  />
                  <div
                    style={{
                      margin: "0 15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <b>{item.productName}</b>
                    </div>
                    <div>
                      sizeVn: {item.sizeVn} | sizeUs:{item.sizeUs} | sizeCm:
                      {item.sizeUs}
                    </div>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 3,
      label: <h3>Đã giao hàng</h3>,
      children: (
        <List
          itemLayout="horizontal"
          dataSource={data3}
          renderItem={(item, index) => (
            <List.Item
              style={{ border: "1px solid #dddddd", cursor: "pointer" }}
              onClick={() => {
                setShow(true);
                setId(item.id);
              }}
            >
              <div>
                {" "}
                <span style={{ color: "blue" }}>#{item.id}</span>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    style={{ width: "150px", height: "200px" }}
                    src={item.productImg[0]}
                    alt=""
                  />
                  <div
                    style={{
                      margin: "0 15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <b>{item.productName}</b>
                    </div>
                    <div>
                      sizeVn: {item.sizeVn} | sizeUs:{item.sizeUs} | sizeCm:
                      {item.sizeUs}
                    </div>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 4,
      label: <h3>Đơn hàng trả lại</h3>,
      children: (
        <List
          itemLayout="horizontal"
          dataSource={data4}
          renderItem={(item, index) => (
            <List.Item
              style={{ border: "1px solid #dddddd", cursor: "pointer" }}
              onClick={() => {
                setShow(true);
                setId(item.id);
              }}
            >
              <div>
                {" "}
                <span style={{ color: "blue" }}>#{item.id}</span>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    style={{ width: "150px", height: "200px" }}
                    src={item.productImg[0]}
                    alt=""
                  />
                  <div
                    style={{
                      margin: "0 15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <b>{item.productName}</b>
                    </div>
                    <div>
                      sizeVn: {item.sizeVn} | sizeUs:{item.sizeUs} | sizeCm:
                      {item.sizeUs}
                    </div>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 5,
      label: <h3>Đơn hàng bị hủy</h3>,
      children: (
        <List
          itemLayout="horizontal"
          dataSource={data5}
          renderItem={(item, index) => (
            <List.Item
              style={{ border: "1px solid #dddddd", cursor: "pointer" }}
              onClick={() => {
                setShow(true);
                setId(item.id);
              }}
            >
              <div>
                {" "}
                <span style={{ color: "blue" }}>#{item.id}</span>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    style={{ width: "150px", height: "200px" }}
                    src={item.productImg[0]}
                    alt=""
                  />
                  <div
                    style={{
                      margin: "0 15px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <b>{item.productName}</b>
                    </div>
                    <div>
                      sizeVn: {item.sizeVn} | sizeUs:{item.sizeUs} | sizeCm:
                      {item.sizeUs}
                    </div>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          padding: "50px 300px",
          overflow: "auto",
          maxHeight: "80vh",
        }}
      >
        <Tabs defaultActiveKey="1" items={menu} />
      </div>
      {show && (
        <ModalChiTiet id={id} show={show} closePreview={() => setShow(false)} />
      )}
    </>
  );
}
