"use client";

import AuthCard from "@/components/auth-card";
import api from "@/lib/api";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function registerHandler(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/api/auth/register", {
        username,
        email,
        password,
      });

      toast.success(response.data.message);
      console.log(response.data);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Register">
      <form
        className="flex flex-col gap-4 w-full max-w-md mx-auto px-4 sm:px-6"
        onSubmit={registerHandler}
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors duration-200"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-300">
          Already have an account?{" "}
          <a href="/auth/login" className="text-green-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </AuthCard>
  );
}
