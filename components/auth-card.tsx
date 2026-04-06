"use client";


import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/lib/api";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthCard({ children, title }: AuthCardProps) {
 
  const [loading, setLoading] = useState<boolean>(false);

  // Google OAuth redirect handler
  async function googleHandler() {
    try {
      setLoading(true);

      // Backend returns Google OAuth URL
      const { data } = await api.get("/api/auth/google");
      if (data.url) {
       
        window.location.href = data.url; // Redirect user to Google login
      } else {
        throw new Error("No URL returned from server");
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Something went wrong";
     
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:w-[400px] bg-transparent backdrop-blur-lg border border-white/20 shadow-xl rounded-xl mx-6 p-8">
      
      {/* Google Login Button */}
      <button
        className={`flex items-center justify-center w-full h-12 bg-slate-100 rounded-lg transition-all hover:scale-105 hover:bg-orange-50 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={googleHandler}
        disabled={loading}
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="text-amber-500 font-medium">
          {loading ? "Redirecting..." : "Continue with Google"}
        </span>
      </button>

      {/* Card Title */}
      <h2 className="text-2xl font-bold text-white text-center p-4">{title}</h2>

      {/* Children */}
      {children}

    </div>
  );
}