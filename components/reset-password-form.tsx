"use client";

import AuthCard from "@/components/auth-card";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
   const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReset = async (e: any) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/auth/reset-password", {
        token,
        newPassword,
      });

      toast.success(res.data.message || "Password reset successful");

      setNewPassword("");

      // redirect after success
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);

    } catch (err: any) {
      const message =
        err.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Reset Password">
      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthCard>
  );
}