import { Route, Routes, useLocation } from "react-router-dom";
import Admin from "./component/body/QTHT/Admin";
import { Layout } from "antd";
import ComponentFooter from "./component/footer/footer";
import ComponentHeader from "./component/header/header";
import ImageHeader from "./component/header/immageHeader";
import SanPham from "./component/body/sanPham";
import ChinhSach from "./component/body/chinhSach";
import LienHe from "./component/body/lienHe";
import TinTuc from "./component/body/tinTuc";
import RouterTrangChu from "./router/routerTrangChu";
import ThanhToan from "./component/body/thongTinSanPham/ThanhToan";
import ChiTiet from "./component/body/ChiTietTinTuc";
import ThongTinUser from "./component/body/ThonTinUser";
import LichSuDatHang from "./component/body/ThongTinDatHang";

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.includes("Admin");

  return (
    <>
      {isAdmin ? (
        <Admin />
      ) : (
        <Layout
          style={{
            display: "flex",
          }}
          className="layout"
        >
          <ImageHeader />
          <Layout.Header
            className="header"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              backgroundColor: "white",
              width: "100%",
              borderTop: "solid 1px #ebe8e8",
            }}
          >
            <ComponentHeader />
          </Layout.Header>
          <Layout.Content style={{ paddingTop: "5px", background: "white" }}>
            <Routes>
              <Route exact path="/*" element={<RouterTrangChu />} />
              <Route path="/SanPham" element={<SanPham />} />
              <Route path="/TinTuc" element={<TinTuc />} />
              <Route path="/ThongTinBaiViet" element={<ChiTiet />} />
              <Route path="/ThongTinUser" element={<ThongTinUser />} />
              <Route path="/LichSuDatHang" element={<LichSuDatHang />} />
              <Route path="/ChinhSach" element={<ChinhSach />} />
              <Route path="/LienHe" element={<LienHe />} />
              <Route path="/ThanhToan" element={<ThanhToan />} />
            </Routes>
            <div className="site-layout-content"></div>
          </Layout.Content>
          <Layout.Footer style={{ textAlign: "center", padding: "0" }}>
            <ComponentFooter />
          </Layout.Footer>
        </Layout>
      )}
    </>
  );
}
