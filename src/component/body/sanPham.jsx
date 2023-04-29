/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Carousel, Checkbox, List, Select } from "antd";
import { useEffect } from "react";
import callApi from "../../api/api";
import HTTP_METHOD from "../../api/method";
import { useState } from "react";
import { cloneDeep } from "lodash";
import { useNavigate } from "react-router-dom";
export default function SanPham() {
  const [danhMuc, setDanhMuc] = useState([]);
  const [thuongHieu, setThuongHieu] = useState([]);
  const [size, setSize] = useState([]);
  const [dataImg, setDataImg] = useState([]);
  const [dataView, setDataView] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    callApi({
      url: "/home/san-pham/shop/product",
      method: HTTP_METHOD.GET,
    }).then((res) => {
      setDataImg(res.Product);
      setDataView(res.Product);
      setDanhMuc(
        res.categories.map((i) => ({
          value: i.name,
          id: i.id,
        }))
      );
      setThuongHieu(
        res.brands.map((i) => ({
          id: i.id,
          value: i.name,
        }))
      );
      setSize(
        res.sizeVn.map((i) => ({
          value: i,
          lable: i,
        }))
      );
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
  const [listFilterDanhMuc, setListFiterDanhMuc] = useState([]);
  const [listFilterThuongHieu, setListFiterThuongHieu] = useState([]);
  useEffect(() => {
    const dataClone = cloneDeep(dataImg)
      .map((i) => {
        if (listFilterDanhMuc.length) {
          const checked = listFilterDanhMuc.filter((item) =>
            i.categoryName.includes(item)
          );
          if (i && checked.length === listFilterDanhMuc.length) {
            return i;
          }
          return undefined;
        } else {
          return i;
        }
      })
      .map((i) => {
        if (listFilterThuongHieu.length) {
          if (i && listFilterThuongHieu.includes(i.brandName)) {
            return i;
          }
          return undefined;
        } else {
          return i;
        }
      })
      .map((i) => {
        if (sizeFilter.length) {
          const checked = sizeFilter.filter((item) => i.size.includes(item));
          if (i && checked.length === sizeFilter.length) {
            return i;
          }
          return undefined;
        } else {
          return i;
        }
      })
      .filter((i) => i !== undefined);
    setDataView(dataClone);
  }, [listFilterDanhMuc, listFilterThuongHieu, sizeFilter]);
  function setFilterDanhMuc(checked) {
    setListFiterDanhMuc(checked);
  }
  function setFilterThuongHieu(checked) {
    setListFiterThuongHieu(checked);
  }
  function listItem(dataItem) {
    return (
      <List
        size="small"
        grid={{
          gutter: 16,
          column: 5,
        }}
        dataSource={dataItem}
        renderItem={(item) => (
          <List.Item style={{ height: "100%" }}>
            <div className="box" style={{ height: "100%" }} key={item}>
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
                  style={{ width: "200px", height: "300px" , borderRadius:'20px'}}
                />
              </div>
              <div className="titleSp">
                <div className="nameSp ellipsis">{item.name}</div>
                <div className="priceSp">
                  {item.price.toLocaleString("vi-VN")}đ
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    );
  }
  return (
    <>
      <Carousel
        style={{
          padding: "0 50px",
        }}
        autoplay
      >
        {sliderImg}
      </Carousel>
      <div className="componentSp">
        <div className="containerFilter">
          <div className="danhmuc">
            <div className="titleDanhmuc">Danh mục</div>
            <div>
              <Checkbox.Group
                className="listDanhmuc"
                onChange={setFilterDanhMuc}
              >
                {danhMuc.map((i) => (
                  <Checkbox
                    style={{
                      margin: "2px 0",
                      lineHeight: "100%",
                    }}
                    className="checkboxItem"
                    value={i.value}
                  >
                    <span style={{ fontSize: 17 }}>{i.value}</span>
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
          </div>
          <div className="thuonghieu">
            <div className="titleThuonghieu">Thương hiệu</div>
            <div>
              <Checkbox.Group
                className="listThuonghieu"
                onChange={setFilterThuongHieu}
              >
                {thuongHieu.map((i) => (
                  <Checkbox
                    style={{
                      margin: "2px 0",
                      lineHeight: "100%",
                    }}
                    className="checkboxItem"
                    value={i.value}
                  >
                    <span style={{ fontSize: 17 }}>{i.value}</span>
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
          </div>
          <div className="size">
            <div className="titleSize">Size</div>
            <div className="listSize">
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                onChange={(e) => setSizeFilter(e)}
                options={size}
              />
              {/* {size.map((i) => (
                <div className="itemSize" key={i}>
                  {i}
                </div>
              ))} */}
            </div>
          </div>
        </div>
        <div className="containerSp">
          <div>{listItem(dataView)}</div>
        </div>
      </div>
    </>
  );
}
