"use client";

import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});



// //request interceptor to add access token to headers

// //without intercepter every  time manually give header  to every request
// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("accessToken");
//       if (token) {
//         config.headers.Authorization = `Bearer${token}`;
//       }
//     }
//     return config;
//   },

//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );




// // Response interceptor to handle token refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as any;

//     // If error is 401 and we haven't tried to refresh yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Attempt to refresh the token
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
//           {},
//           { withCredentials: true }
//         );

//         const { accessToken } = response.data;

//         // Store new access token
//         localStorage.setItem("accessToken", accessToken);

//         // Retry original request with new token
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
        
//         // Refresh failed - redirect to login
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("user");

//         if (typeof window !== "undefined") {
//           window.location.href = "/auth/login";
//         }
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
