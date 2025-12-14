"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Wait a bit longer for auth state to settle after redirect
    // Give more time in production for auth state to sync
    if (!loading && !currentUser && !isRedirecting) {
      setIsRedirecting(true);
      // Increased delay to ensure auth state is checked, especially after Google Sign-In
      const timer = setTimeout(() => {
        router.push("/login");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentUser, loading, router, isRedirecting]);

  // Show loading state while checking auth
  if (loading || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-700 dark:text-gray-300">Loading...</div>
        </div>
      </div>
    );
  }

  // Show loading while redirecting if not authenticated
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-700 dark:text-gray-300">Redirecting to login...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Firebase Auth Starter
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              You are successfully authenticated!
            </p>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                User Information
              </h2>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Email:</span> {currentUser.email}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">UID:</span> {currentUser.uid}
                </p>
                {currentUser.displayName && (
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Display Name:</span>{" "}
                    {currentUser.displayName}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href="/profile"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

