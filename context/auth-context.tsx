"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

type User = {
  _id: string;
  username: string;
  email: string;
};

type AuthType = {
  user: User | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔄 get user
  const fetchUser = async () => {
    try {
      const res = await api.get("/user/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 refresh token
  const refresh = async () => {
    try {
      await api.post("/api/auth/refresh");
      await fetchUser();
    } catch {
      setUser(null);
    }
  };

  // 🚪 logout
  const logout = async () => {
    await api.post("/api/auth/logout");
    setUser(null);
    router.push("/auth/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext not found");
  return ctx;
};