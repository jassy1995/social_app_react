import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:4100/api",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const { intercept = true } = config;
  if (!intercept) return config;
  const token = JSON.parse(localStorage.getItem("app_user")) || "";
  if (token.token) config.headers["authorization"] = token.token;
  return config;
});

export default http;
