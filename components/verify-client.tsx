"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useSearchParams } from "next/navigation";

export default function VerifyClient() {
   const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
  const router = useRouter();
  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const verify = async () => {
      try {
        await api.post("/api/auth/verify-email", { token });
        setStatus("success");

        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
      } catch (err) {
        setStatus("error");
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="text-center mt-10">
      {status === "loading" && <h1>Verifying your email...</h1>}
      {status === "success" && <h1>✅ Email verified! Redirecting...</h1>}
      {status === "error" && <h1>❌ Invalid or expired token</h1>}
    </div>
  );
}