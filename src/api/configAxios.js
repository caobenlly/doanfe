import axios from "axios";
const apiAxios = axios.create({
  baseURL: "https://webshoesdoanversion1.herokuapp.com",
});
apiAxios.defaults.headers.common["Content-Type"] = "application/json";
apiAxios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
apiAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token_shopGiay");
    config.headers.Authorization = token;
    return config;
  },
  (error) => {
    Promise.reject(error).then();
  }
);
apiAxios.interceptors.response.use(
  (config) => {
    config.data?.token &&
      localStorage.setItem("token_shopGiay", config.data?.token);
    config.data?.expiry_date &&
      localStorage.setItem("expiry_date", config.data?.expiry_date);
    return config;
  },
  (error) => {
    return error.response;
  }
);
export default apiAxios;
