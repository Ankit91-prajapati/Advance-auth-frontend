"use client";
import ResetPasswordForm from "@/components/reset-password-form";
import { Suspense } from "react";


export default function Page() {
 

  return (
     <Suspense fallback={<div>verifying email.......</div>}> 
    <ResetPasswordForm />;
    </Suspense>
  )
 
  
}