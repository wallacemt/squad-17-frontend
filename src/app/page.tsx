"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    // Redirect authenticated users to feed
    if (isAuthenticated) {
      router.push("/feed");
    }
  }, [isAuthenticated, router]);

  // Show loading state while checking authentication
  return (
    <div className="flex items-center justify-center min-h-screen bg-body-crx">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-crx border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white">Carregando...</p>
      </div>
    </div>
  );
}
