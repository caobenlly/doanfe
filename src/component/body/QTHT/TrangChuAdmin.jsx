import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faInbox,
  faBook,
  faCartShopping,
  faBookmark,
  faUserInjured,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import callApi from "../../../api/api";
import HTTP_METHOD from "../../../api/method";
import Chart from "react-google-charts";

export default function TrangChuAdmin() {
  const [dataHeader, setDataHeader] = useState({});
  const [dataCatagories, setDataCatagories] = useState();
  const [dataBrands, setDataBrands] = useState();
  const [dataOder, setDataOder] = useState();
  useEffect(() => {
    getData();
  }, []);
  function getData() {
    callApi({
      url: "/admin",
      method: HTTP_METHOD.GET,
    }).then((res) => {
      setDataHeader(res);
    })
    callApi({
      url: "/api/admin/product-order-categories",
      method: HTTP_METHOD.GET,
    }).then((res) => {
      let data = [];
      for (const prop in res) {
        data.push([prop, res[prop]]);
      }
      setDataCatagories([["Danh mục", "Số sản phẩm bán được"], ...data]);
    })
    callApi({
      url: "/api/admin/product-order-brands",
      method: HTTP_METHOD.GET,
    }).then((res) => {
      let data = [];
      for (const prop in res) {
        data.push([prop, res[prop]]);
      }
      setDataBrands([["Nhãn hàng", "Số sản phẩm bán được"], ...data]);
    });
    callApi({
      url: "/api/admin/product-order",
      method: HTTP_METHOD.GET,
    }).then((res) => {
      console.log(res);
      let data = [];
      for (let i = 1; i <= 12; i++) {
        const check = res.findIndex((item) => +item[0] === i);
        if (check === -1) {
          res.push([i + "", 0]);
        } else {
          res[check] = [i + "", +res[check][1]];
        }
      }
      const newRes = res.sort((a, b) => +a[0] - +b[0]);
      for (const prop in newRes) {
        data.push([prop, res[prop][1]]);
      }
      setDataOder([["Tháng", "Nghìn đồng(VND)"], ...data]);
    });
  }

  const options3 = {
    title: "Company Performance",
    hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
  };

  const number = 5;
  return (
    <div>
      <Row gutter={[32, 24]}>
        <Col span={8}>
          <div class="book-container">
            <div class="book-content">
              <div className="iconAdmin">
                <FontAwesomeIcon
                  icon={faFileLines}
                  style={{ fontSize: "85px", color: "#0077b6" }}
                />
              </div>
              <div className="titleBoxSp">
                <span>Số lượng sản phẩm</span>
                <div>{dataHeader.Product}</div>
                <p>( XEM CHI TIẾT )</p>
              </div>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="book-container">
            <div class="book-content">
              <div className="iconAdmin">
                <FontAwesomeIcon
                  icon={faInbox}
                  style={{ fontSize: "85px", color: "#ff7f50" }}
                />
              </div>
              <div className="titleBoxSp">
                <span>Tổng số danh mục</span>
                <div>{dataHeader.Category}</div>
                <p>( XEM CHI TIẾT )</p>
              </div>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="book-container">
            <div class="book-content">
              <div className="iconAdmin">
                <FontAwesomeIcon
                  icon={faBook}
                  style={{ fontSize: "85px", color: "#1abc9c" }}
                />
              </div>
              <div className="titleBoxSp">
                <span>Tổng số bài viết</span>
                <div>{dataHeader.Post}</div>
                <p>( XEM CHI TIẾT )</p>
              </div>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="book-container">
            <div class="book-content">
              <div className="iconAdmin">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ fontSize: "85px", color: "#9b59b6" }}
                />
              </div>
              <div className="titleBoxSp">
                <span>Tổng số đơn hàng</span>
                <div>{dataHeader.Order}</div>
                <p>( XEM CHI TIẾT )</p>
              </div>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="book-container">
            <div class="book-content">
              <div className="iconAdmin">
                <FontAwesomeIcon
                  icon={faBookmark}
                  style={{ fontSize: "85px", color: "#f1c40f" }}
                />
              </div>
              <div className="titleBoxSp">
                <span>Tổng số nhãn hiệu</span>
                <div>{dataHeader.Brand}</div>
                <p>( XEM CHI TIẾT )</p>
              </div>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="book-container">
            <div class="book-content">
              <div className="iconAdmin">
                <FontAwesomeIcon
                  icon={faUserInjured}
                  style={{ fontSize: "85px", color: "#e74c3cs" }}
                />
              </div>
              <div className="titleBoxSp">
                <span>Tổng số User</span>
                <div>{number}</div>
                <p>( XEM CHI TIẾT )</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div className="containerChar">
        <div className="CharLeft">
          <div className="charPie" style={{ width: "750px" }}>
            <Chart
              chartType="PieChart"
              data={dataCatagories}
              options={{ title: "Số lượng Sản phẩm được mua theo danh mục" }}
              width="100%"
              height="500px"
              legendToggle
            />
          </div>
        </div>
        <div className="CharRight">
          <div className="charPie" style={{ width: "750px" }}>
            <Chart
              chartType="ColumnChart"
              data={dataOder}
              width="100%"
              height="500px"
              options={options3}
            />
          </div>
        </div>
      </div>
      <div>
        <Chart
          chartType="PieChart"
          data={dataBrands}
          options={{ title: "Số lượng Sản phẩm được mua theo nhãn hiệu" }}
          width="100%"
          height="700px"
          legendToggle
        />
      </div>
    </div>
  );
}
