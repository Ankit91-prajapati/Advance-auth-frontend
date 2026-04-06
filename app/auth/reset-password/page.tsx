"use client"
export const dynamic = "force-dynamic";
import AuthCard from "@/components/auth-card";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/lib/api";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Get Token from URL
  console.log(token);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: any) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(
        "/api/auth/reset-password",
        {
          token, // include token here
          newPassword, // new password
        },
       
      );
      toast.success(response.data.message || "Password reset successfully");
      setNewPassword("");
    } catch (err: any) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Reset Password">
      <form className="space-y-4" onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthCard>
  );
}
