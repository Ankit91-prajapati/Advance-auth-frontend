"use client";

import api from "@/lib/api";
import AuthCard from "@/components/auth-card";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email ,setEmail] = useState<string>("")
  const[password ,setPassword] = useState<string>("")
  const[loading ,setLoading] = useState<boolean>(false)
  const router = useRouter()
 async function loginHandler(e: any) {
  e.preventDefault()
  try {
    setLoading(true)
    const response = await api.post("/api/auth/login", { email, password })
    
    if (response.data.success) {
  toast.success(response.data.message);
  window.location.replace("/dashboard"); // cookie is set, hard reload guarantees middleware sees it
}
    
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Something went wrong")
  } finally {
    setLoading(false)
  }
}

  return (
    <AuthCard title="Login">
      <form className="space-y-4" onSubmit={loginHandler}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
        >
          {loading ? "login please wait..." : "Login"}
        </button>

        <div className="flex justify-between text-sm text-gray-300">
          <a href="/auth/forgot-password">Forgot Password?</a>
          <a href="/auth/register">Register</a>
        </div>
      </form>
    </AuthCard>
  );
}
