import { useState } from "react";
import callApi from "../../api/api";
import HTTP_METHOD from "../../api/method";
import { useEffect } from "react";
import { Card, List } from "antd";
import { converDate } from "../../assets/comonFc";
import { useNavigate } from "react-router-dom";

export default function TinTuc() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    callApi({
      url: "/api/homepage/posts",
      method: HTTP_METHOD.GET,
    }).then((res) => setData(res));
  }, []);
  return (
    <div
      style={{
        padding: "50px 300px",
        overflow: "auto",
        maxHeight: "80vh",
      }}
    >
      <List
        style={{ display: 'flex'}}
        grid={{
          gutter: 16,
          column: 1,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
           style={{ display: 'flex' }}
          >
            <Card
              title={item.title}
              onClick={() => navigate(`/ThongTinBaiViet?id=${item.id}`)}
              style={{ alignItems: 'center', margin: '0 auto', }}
            >
              <div >
                <img
                  src={item.thumbnail}
                  alt=""
                  style={{ width: "1000px", height: "500px", margin: '0 auto' }}
                />
                <div>
                  <span>
                    <b>Ngày tạo :</b> {converDate(item.createdAt)}
                  </span>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
