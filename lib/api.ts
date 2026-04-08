import axios from "axios";
import { redirect } from "next/navigation"; // Only works in Server components/Actions

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        return api(originalRequest);
      } catch (err) {
        // --- AUTH FAILURE LOGIC ---
        
        // 1. Client-Side (Browser)
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login?expired=true";
        } 
        // 2. Server-Side (SSR / Server Actions)
        else {
          // In Next.js Server Actions or Metadata, you can use redirect()
          // Note: This only works if this axios call is awaited inside a Server Action/Component
          redirect("/auth/login?expired=true");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;