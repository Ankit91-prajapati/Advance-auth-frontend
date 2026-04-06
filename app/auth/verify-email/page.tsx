"use client";
import VerifyClient from "@/components/verify-client";

import { Suspense } from "react";
export default function Page() {
  return (
    <Suspense fallback={<div>verifying email.......</div>}> 
      <VerifyClient />
    </Suspense>
  );
}
