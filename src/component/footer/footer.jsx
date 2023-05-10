import {
  FacebookFilled,
  InstagramFilled,
  TwitterSquareFilled,
} from "@ant-design/icons";
import "../../assets/stylesheet/footer.css";
export default function ComponentFooter() {
  const dataLeft = [
    {
      title: "ĐỊA CHỈ",
      text: "Duy Tân - Cầu Giấy",
      className: "footerSup",
    },
    {
      title: "SỐ ĐIỆN THOẠI",
      text: "0395830008",
      className: "footerSup",
    },
    {
      title: "EMAIL",
      text: "hungmaychem@gmail.com",
      className: "footerSup",
    },
    {
      title: "THỜI GIAN LÀM VIỆC",
      text: "Thứ 2 - Chủ nhật / 9:00AM - 8:00PM",
      className: "footerSup",
    },
  ];
  const dataCenter = [
    { key: "/", value: "Trang chủ" },
    { key: "/SanPham", value: "Sản phẩm" },
    { key: "/TinTuc", value: "Tin tức" },
    { key: "/LienHe", value: "Liên hệ" },
  ];
  const dataRight = ["Hướng dẫn mua hàng", "Chính sách đổi trả & hoàn tiền"];
  const styleIcon = {
    height: "40px",
    width: "40px",
    fontSize: "20px",
    marginRight: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #706e6e",
    borderRadius: "50%",
  };
  return (
    <div style={{ backgroundColor: "#222529", marginTop: "50px" }}>
      <div className="footerBox">
        <div className="footerLeft">
          <h2 className="titleFooter">VỀ CỬA HÀNG</h2>
          {dataLeft.map((item) => (
            <div key={item} className={item.className}>
              <h3 className="titleFooterSup">{item.title}</h3>
              <div className="textSup">{item.text}</div>
            </div>
          ))}
          <div className="iconFooter">
            <InstagramFilled style={styleIcon} />
            <FacebookFilled style={styleIcon} />
            <TwitterSquareFilled style={styleIcon} />
          </div>
        </div>
        <div className="footerCenter">
          <h2 className="titleFooter">THÔNG TIN</h2>
          {dataCenter.map((item) => (
            <div key={item} className="inforFooter">
              <a href={item.key} className="textSup">
                {" "}
                &gt;{item.value}
              </a>
            </div>
          ))}
        </div>
        <div className="footerRight">
          <h2 className="titleFooter">HUỚNG DẪN & CHÍNH SÁCH</h2>
          {dataRight.map((item) => (
            <div key={item} className="inforFooter">
              <a href="/Chinhsach" className="textSup">
                {" "}
                &gt;{item}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
