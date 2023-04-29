import apiAxios from "./configAxios";
import HTTP_METHOD from "./method";

export default function callApi(props) {
  const expiry_date = localStorage.getItem("expiry_date");
  const checkToken =
    (new Date(+expiry_date) - new Date()) / (1000 * 60 * 60 * 24);
  if (checkToken <= 0) {
    apiAxios({
      url: "/refreshtoken",
      method: HTTP_METHOD.POST,
    }).then((res) => {
      if (!res) {
        return;
      }
    });
  }
  return apiAxios(props)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
