import { Carousel, List } from "antd";
import "../../assets/stylesheet/body.css";
import callApi from "./../../api/api";
import { useEffect, useState } from "react";
import HTTP_METHOD from "../../api/method";
import { SlideImages } from "../../assets/comonCpn";
import { useNavigate } from "react-router-dom";
export default function TrangChu() {
  const navigate = useNavigate();
  const [dataHomePage, setDataHomePage] = useState({});
  useEffect(() => {
    callApi({
      url: "home/shop/index",
      method: HTTP_METHOD.GET,
    }).then((res) => {
      console.log(res);
      setDataHomePage(res);
    });
  }, []);

  const arrImg = [
    "https://a.ipricegroup.com/trends-article/top-3-mau-giay-converse-duoc-cac-ngoi-sao-quoc-te-ua-chuong-medium.jpg",
    "https://www.elleman.vn/wp-content/uploads/2018/08/13/gi%C3%A0y-sneakers-2-elle-man-8.jpg",
    "https://www.elleman.vn/wp-content/uploads/2020/08/19/182814/van-hoa-giay-the-thao-elle-man-feature.jpg",
    "https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2021_04_28/vnp_tai_che_giay_1.png",
  ];

  const sliderImg = arrImg.map((item) => (
    <div key={item}>
      <img
        height={"600px"}
        src={item}
        style={{ width: "100%" }}
        alt={"Xảy ra lỗi"}
      />
    </div>
  ));
  return (
    <div>
      <Carousel style={{ padding: " 0 0px"}} dots={false} autoplay>
        {sliderImg}
      </Carousel>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "200px",
        }}
      >
        <div className="containerSup">
          <div className="titleSup">
            {/* <div className="icon"></div> */}
            <div className="textSup">
              <div className="textT">FREE SHIPPING & RETURN</div>
              <div className="textD">Free shipping on all orders over $99</div>
            </div>
          </div>
        </div>
        <div className="containerSup">
          <div
            className="titleSup"
            style={{
              borderLeft: " 2px solid #ddd",
              borderRight: " 2px solid #ddd",
            }}
          >
            {/* <div className="icon">
              <DollarOutlined />
            </div> */}
            <div className="textSup">
              <div className="textT">MONEY BACK GUARANTEE</div>
              <div className="textD">100% money back guarantee</div>
            </div>
          </div>
        </div>
        <div className="containerSup">
          <div className="titleSup">
            {/* <div className="icon">
            <DollarOutlined />
          </div> */}
            <div className="textSup">
              <div className="textT">ONLINE SUPPORT 24/7</div>
              <div className="textD">Lorem ipsum dolor sit amet</div>
            </div>
          </div>
        </div>
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
        <div
          className="titleSpNew"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <h2 className="titleBody">
            <span>SẢN PHẨM MỚI</span>
          </h2>
        </div>
        <div>
          <div>{SlideImages(dataHomePage?.newProducts)}</div>
        </div>
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
        <div
          className="titleSpNew"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <h2 className="titleBody">
            <span>SẢN PHẨM XEM NHIỀU</span>
          </h2>
        </div>
        <div>
          <div>{SlideImages(dataHomePage?.viewProducts)}</div>
        </div>
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
        <div
          className="titleSpNew"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <h2 className="titleBody">
            <span>SẢN PHẨM MUA NHIỀU</span>
          </h2>
        </div>
        <div>{SlideImages(dataHomePage?.bestSellerProducts)}</div>
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
        <div
          className="titleSpNew"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <h2 className="titleBody">
            <span>TIN MỚI NHẤT</span>
          </h2>
        </div>
        <List
          size="small"
          grid={{
            gutter: 16,
            column: 5,
          }}
          dataSource={dataHomePage?.posts}
          renderItem={(item) => (
            <List.Item
              style={{ height: "300px", width: '500px', paddingBottom: '50px' }}
              onClick={() => navigate(`/ThongTinBaiViet?id=${item.id}`)}
            >
              <div className="box" style={{ height: "100%" }} key={item}>
                <div style={{ height: "100%" }} className="imgSp">
                  <img
                    src={item.thumbnail}
                    alt="lỗi"
                    style={{ width: "100%", height: "100%", borderRadius:'20px' }}
                  />
                </div>
                <div className="titleSp">
                  <b
                    className="nameSp"
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: "15px",
                    }}
                  >
                    {item.title}
                  </b>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
