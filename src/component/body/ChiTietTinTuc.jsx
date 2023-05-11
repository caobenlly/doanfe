import { useState } from "react";
import callApi from "../../api/api";
import HTTP_METHOD from "../../api/method";
import { converDate } from "../../assets/comonFc";
import { useEffect } from "react";
import CKEditorTable from "./QTHT/TableEdit";
import { useSearchParams } from "react-router-dom";

export default function ChiTiet() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState({});
  useEffect(() => {
    callApi({
      url: `/api/homepage/posts/${id}`,
      method: HTTP_METHOD.GET,
    }).then((res) => setData(res.post));
  }, [id]);
  return (
    <div
      style={{
        padding: "50px 300px",
      }}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        <h1 className="titilePost">{data.title}</h1>
        <img
          src={data.thumbnail}
          alt=""
          style={{ width: "100%", height: "500px" }}
        />
        <br />
        <span>
          <b>Ngày tạo:</b> {converDate(data.createdAt)}
        </span>
        <br />
        <span>
          <b>Người viết:</b> {data?.createdBy?.fullName}
        </span>
        <br />
        <CKEditorTable
          setValue={false}
          value={data?.description}
          isChiTiet={true}
        />
      </div>
    </div>
  );
}
