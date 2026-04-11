"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [username, setUsername] = useState<string|null>(null);
  const router = useRouter();

  async function getUser() {
    try {
      const response = await api.get("/user/me" ,);  
      const user = response.data.user;
      setUsername(user.username);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  }

  async function handleLogout(e: any) {
    e.preventDefault();

    try {
      const response = await api.post("/api/auth/logout" ,{} , {withCredentials: true});
      toast.success(response.data.message);
      if(response.data.success){
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
    <div >
      <div className="group">
        <div className="absolute top-0 left-0 text-2xl m-8 rounded-full w-8 h-8 text-center bg-blue-500 text-white opacity-100 group-hover:opacity-0">
          {username?.charAt(0) || "D"}
        </div>

        <div className="absolute text-2xl text-white top-0 left-0 m-8 opacity-0 group-hover:opacity-100">
          {username || "Developer"}
        </div>
      </div>

      <button
        className="absolute top-0 right-0 m-6 w-20 p-1 rounded-xl text-white text-xl bg-red-400 hover:bg-red-800 active:bg-red-800 "
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}