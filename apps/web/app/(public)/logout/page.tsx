"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@repo/firebase-config";
import { useAuth } from "@/contexts/auth-context";
import SectionHeading from "@/components/ui/section-heading";

export default function LogoutPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoutComplete, setLogoutComplete] = useState(false);

  useEffect(() => {
    if (!authLoading && !user && !logoutComplete) {
      router.push("/");
    }
  }, [user, authLoading, router, logoutComplete]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setError(null);

    try {
      await signOut();
      setLogoutComplete(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to log out");
      setIsLoggingOut(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen pt-20 pb-20 md:pb-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden reg-bg-image">
        <div className="max-w-full mx-auto relative z-10 mt-10 md:mt-24">
          <SectionHeading title="Logout" />
          <div className="max-w-md mx-auto p-6 font-inria form-container gradient-border">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
              <p className="text-white/70">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user && !logoutComplete) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 pb-20 md:pb-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden reg-bg-image">
      <div className="max-w-full mx-auto relative z-10 mt-10 md:mt-24">
        <SectionHeading title="Logout" containerClassName="mb-20" />
        <div className="max-w-md mx-auto p-6 font-inria form-container gradient-border">
          {logoutComplete ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Successfully Logged Out</h2>
              <p className="text-white/70 mb-4">You have been signed out of your account.</p>
              <p className="text-white/50 text-sm">Redirecting to home page...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Sign Out</h2>
              <p className="text-white/70 mb-2">
                Logged in as: <span className="text-white font-medium">{user?.email}</span>
              </p>
              <p className="text-white/50 text-sm mb-6">Are you sure you want to log out?</p>

              {error && (
                <div className="w-full bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-4 w-full">
                <button
                  onClick={handleCancel}
                  disabled={isLoggingOut}
                  className="flex-1 py-3 px-4 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex-1 py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Logging out...
                    </>
                  ) : (
                    "Log Out"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
