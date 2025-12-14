import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProfile, updateUserProfile, uploadProfileImage } from "@/services/userService";
import { UserProfile, UserProfileUpdate } from "@/types/user";

export function useUserProfile() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setProfile(null);
      setLoading(false);
      return;
    }

    loadProfile();
  }, [currentUser]);

  async function loadProfile() {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError(null);
      const userProfile = await getUserProfile(currentUser.uid);
      setProfile(userProfile);
      // If profile is null (Firestore unavailable), don't set error - just use auth user data
      if (!userProfile && process.env.NODE_ENV === "development") {
        console.warn("User profile not found in Firestore. Using auth user data.");
      }
    } catch (err: any) {
      // Don't set error for offline/unavailable - just use auth user data
      if (err?.code === "unavailable" || err?.message?.includes("offline") || err?.message?.includes("timeout")) {
        setProfile(null); // Will fall back to auth user data
        if (process.env.NODE_ENV === "development") {
          console.warn("Firestore unavailable. Using auth user data.");
        }
      } else {
        setError(err.message || "Failed to load profile");
        console.error("Error loading profile:", err);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(updates: UserProfileUpdate) {
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    try {
      setError(null);
      await updateUserProfile(currentUser.uid, updates);
      await loadProfile(); // Reload profile after update
    } catch (err: any) {
      const errorMessage = err.message || "Failed to update profile";
      setError(errorMessage);
      throw err;
    }
  }

  async function uploadImage(file: File) {
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    try {
      setError(null);
      const downloadURL = await uploadProfileImage(currentUser.uid, file);
      await updateProfile({ photoURL: downloadURL });
      return downloadURL;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to upload image";
      setError(errorMessage);
      throw err;
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile,
    uploadImage,
    refreshProfile: loadProfile,
  };
}

