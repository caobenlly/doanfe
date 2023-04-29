import { Routes, Route } from "react-router-dom";
import TrangChu from "./../component/body/trangChu";
import ThongtinSp from "../component/body/thongTinSanPham/thongtinSanPham";
export default function RouterTrangChu() {
  console.log('object');
  return (
    <Routes>
      <Route path="/" element={<TrangChu />} />
      <Route path="/ThongTinSanPham/*" element={<ThongtinSp />} />
    </Routes>
  );
}
