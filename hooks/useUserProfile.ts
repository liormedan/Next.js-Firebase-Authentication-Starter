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
    } catch (err: any) {
      setError(err.message || "Failed to load profile");
      console.error("Error loading profile:", err);
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

