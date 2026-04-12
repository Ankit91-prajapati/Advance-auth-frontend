"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();
  const [show, setShow] = useState(false);

  async function getUser() {
    try {
      const response = await api.get("/user/me");
      const user = response.data.user;
      setUsername(user.username);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  }

  async function handleLogout(e: any) {
    e.preventDefault();

    try {
      const response = await api.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.success(response.data.message);
      if (response.data.success) {
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      
      {/* Top Left User */}
      <div
        onClick={() => setShow(!show)}
        className="absolute top-4 left-4 cursor-pointer"
      >
        {!show ? (
          <div className="text-2xl w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white">
            {username?.charAt(0) || "D"}
          </div>
        ) : (
          <div className="text-xl text-black font-semibold">
            {username || "Developer"}
          </div>
        )}
      </div>

      {/* Logout Button */}
      <button
        className="absolute top-4 right-4 w-24 p-2 rounded-xl text-white text-lg bg-red-400 md:hover:bg-red-800 active:bg-red-800"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}