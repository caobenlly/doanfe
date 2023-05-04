import { notification } from "antd";
import Error from "../assets/icon/error.svg";
import GreenCheck from "../assets/icon/green-check-icon.svg";

export function converDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  const dateTimeString = `${year}-${month}-${day} ${hour}:${minute}`;
  return dateTimeString;
}
export const messageError = (text) => {
  const config = { message: text || "Có lỗi xảy ra" };
  notification.open({
    placement: "topRight",
    icon: <img src={Error} alt="Error icon" />,
    className: "notiError",
    duration: 3,
    ...config,
  });
};
export const messageSuccess = (text) => {
  const config = { message: text || "Thành công" };
  notification.open({
    placement: "topRight",
    icon: <img src={GreenCheck} alt="Success icon" />,
    className: "notiSuccess",
    duration: 3,
    ...config,
  });
};

export const handleFileChange = (e) => {
  return URL.createObjectURL(e.target.files);
};
