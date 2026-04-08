"use client";

import { createContext, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";


export const RefreshContext = createContext<any>(null);

export const RefreshProvider = ({ children }: { children: React.ReactNode }) => {

  const refresh = async () => {
    try {
      const res = await api.post("/api/auth/refresh");
      toast.success(res.data.message)
    } catch (err) {
      console.log("User not logged in");
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <RefreshContext.Provider value={{}}>
      {children}
    </RefreshContext.Provider>
  );
};