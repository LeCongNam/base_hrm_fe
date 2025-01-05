import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Base URL của API (thay đổi tuỳ theo project của bạn)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Khởi tạo Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Thời gian timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để xử lý request (e.g., thêm token vào header)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Thêm interceptor để xử lý response
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Xử lý lỗi (e.g., log ra console, hoặc thông báo lỗi)
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  },
);

export default apiClient;
