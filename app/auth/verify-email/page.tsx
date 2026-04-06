"use client";
export const dynamic ="force-dynamic"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import api from "@/lib/api"; // 👈 from here

export default function VerifyEmail() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      try {
        await api.post("/api/auth/verify-email", { token }); // ✅ using api.ts
        router.push("/auth/login");
      } catch (err) {
        console.log("Verification failed");
      }
    };

    verify();
  }, [token]);

  return <h1>Verifying...</h1>;
}