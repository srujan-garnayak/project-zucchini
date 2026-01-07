"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "@repo/firebase-config";
import { useRouter, usePathname } from "next/navigation";
import { publicRoutes } from "@/config";

interface AuthContextType {
  user: any | null;
  role: string | null;
  isVerified: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isVerified: false,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await signOut();
    setUser(null);
    setRole(null);
    setIsVerified(false);
    router.push("/login");
  };

  const checkUserRole = async (uid: string) => {
    try {
      // We can't use useApi here nicely because it's a hook, but we can fetch directly or extract logic.
      // Better to use fetch for context initialization as hooks inside checks are tricky.
      // Or we can rely on the fact that we have the token.

      const token = await (await import("@repo/firebase-config")).auth.currentUser?.getIdToken();
      if (!token) throw new Error("No token");

      const res = await fetch("/api/auth/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.data) {
        if (data.data.role) setRole(data.data.role);
        setIsVerified(!!data.data.isVerified);
      }
      return data.data;
    } catch (error) {
      console.error("Role check failed:", error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      try {
        if (authUser) {
          setUser(authUser);
          await checkUserRole(authUser.uid);
        } else {
          setUser(null);
          setRole(null);
          setIsVerified(false);
        }
      } catch (error) {
        console.error("Auth state change error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isPublicRoute = publicRoutes.some((route) => pathname?.startsWith(route));
    if (!user && !isPublicRoute) {
      router.push("/login");
    }

    if (user && isVerified && pathname === "/login") {
      if (role === "NU") {
        router.push("/nitrutsav");
      } else if (role === "MUN") {
        router.push("/mun");
      } else {
        router.push("/");
      }
    }
  }, [user, isVerified, loading, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, role, isVerified, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
