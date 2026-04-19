"use client";

import Protected from "@/components/protected-route";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [show, setShow] = useState(false);

  return (
    <Protected>
      <div className="relative min-h-screen w-full">
        
        {/* User */}
        <div
          onClick={() => setShow(!show)}
          className="absolute top-4 left-4 cursor-pointer"
        >
          {!show ? (
            <div className="text-2xl w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white">
              {user?.username?.charAt(0) || "D"}
            </div>
          ) : (
            <div className="text-xl text-black font-semibold">
              {user?.username || "Developer"}
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          className="absolute top-4 right-4 w-24 p-2 rounded-xl text-white text-lg bg-red-400 md:hover:bg-red-800 active:bg-red-800"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </Protected>
  );
}