"use client";

import { createContext, useEffect } from "react";
import api from "@/lib/api";


export const RefreshContext = createContext<any>(null);

export const RefreshProvider = ({ children }: { children: React.ReactNode }) => {

  const refresh = async () => {
    try {
      const res = await api.get("/auth/refresh");
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