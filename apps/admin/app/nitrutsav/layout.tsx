"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NitrutsavLayout({ children }: { children: React.ReactNode }) {
  const { role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (role !== "ADMIN" && role !== "NU") {
      router.push("/");
    }
  }, [role, loading, router]);

  if (loading) return null;

  if (role !== "ADMIN" && role !== "NU") {
    return null;
  }

  return <>{children}</>;
}
