import axios from "axios";
import qs from "qs";
import dataInit from "@/config";
import store from "@/store";
import { clearUser } from "@/store/userSlice";
import { toast } from "react-toastify";

// 创建 axios 实例
const service = axios.create({
  baseURL: "/api",
  timeout: 10000, // 请求超时时间（毫秒）
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 统一添加 token
    const token = localStorage.getItem(dataInit.cookieID);
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    if (config.method === "post") {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      config.data = qs.stringify(config.data);
    }

    return config;
  },
  (error) => {
    console.error("请求错误", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error(error.message);
        toast.error("登录已过期，请重新登录");
        localStorage.removeItem(dataInit.cookieID);
        store.dispatch(clearUser());
      }
    } else if (error.request) {
      console.error("请求无响应", error.request);
    } else {
      console.error("请求设置错误", error.message);
    }
    return Promise.reject(error);
  }
);

export default service;
