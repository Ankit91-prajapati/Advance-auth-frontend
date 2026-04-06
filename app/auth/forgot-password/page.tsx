"use client"

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import AuthCard from "@/components/auth-card";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const forgetPasswordHandler = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/api/auth/forgot-password", { email });
     ; // ensure this is token only
      toast.success(response.data.message);
      
    } catch (err: any) {
      const message = err.response?.data?.message || "Something went wrong";
      
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Forgot Password">
      <form onSubmit={forgetPasswordHandler} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg"
          disabled={loading}
        >
          {loading ? "Sending reset link..." : "Send Reset Link"}
        </button>
        
      </form>
    </AuthCard>
  );
}