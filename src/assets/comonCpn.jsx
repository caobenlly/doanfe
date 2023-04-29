import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";

export const SimpleSlider = ({ listImg }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <Slider {...settings}>
      {listImg.map((image, index) => (
        <img src={image.images} alt="lỗi" style={{ width: "100%" }} />
      ))}
    </Slider>
  );
};

export const SlideImages = (images) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  return (
    <div className="slider" style={{ display: "flex", alignItems: "center" }}>
      <Row style={{ width: "100%", justifyContent: "center" }}>
        <Col span={21}>
          <div
            className="slider-wrapper"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: "0 200px",
            }}
          >
            {images?.map((item, index) => (
              <div
                className="box"
                style={{ height: "100%", margin: "0 15px"}}
                key={item}
              >
                <div
                  style={{ height: "70%", cursor: "pointer" }}
                  className="imgSp"
                  onClick={() => {
                    navigate(`/ThongTinSanPham/${item.name}?id=${item.id}`);
                  }}
                >
                  <img
                    src={item.images}
                    alt="lỗi"
                    style={{ width: "200px", height: "300px", borderRadius:"20px"}}
                  />
                </div>
                <div className="titleSp" style={{ maxWidth: "200px" }}>
                  <div className="nameSp ellipsis">{item.name}</div>
                  <div className="priceSp">
                    {item.price.toLocaleString("vi-VN")}đ
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};
