import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { UserProfile, UserProfileUpdate } from "@/types/user";

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!db) {
    console.warn("Firestore is not initialized. Cannot get user profile.");
    return null;
  }

  try {
    const userDocRef = doc(db, "users", uid);
    
    // Add timeout to prevent hanging
    const userDocSnap = await Promise.race([
      getDoc(userDocRef),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Firestore request timeout")), 5000)
      )
    ]) as any;

    if (!userDocSnap.exists()) {
      return null;
    }

    const data = userDocSnap.data();
    return {
      uid: data.uid,
      email: data.email,
      displayName: data.displayName,
      photoURL: data.photoURL,
      bio: data.bio,
      phoneNumber: data.phoneNumber,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      preferences: data.preferences || {},
    };
  } catch (error: any) {
    // Don't throw - return null if Firestore is unavailable
    if (error?.code === "unavailable" || error?.message?.includes("offline") || error?.message?.includes("timeout")) {
      console.warn("Firestore is offline or unavailable. Cannot get user profile.");
      return null;
    }
    console.error("Error getting user profile:", error);
    return null;
  }
}

/**
 * Create or update user profile in Firestore
 * This function is non-blocking - it won't throw errors that would block authentication
 */
export async function createUserProfile(
  uid: string,
  email: string,
  additionalData?: Partial<UserProfile>
): Promise<void> {
  if (!db) {
    // Firestore not initialized - silently fail, don't block auth
    console.warn("Firestore is not initialized. User profile will not be created.");
    return;
  }

  try {
    const userDocRef = doc(db, "users", uid);
    
    // Use getDoc with timeout to prevent hanging
    const userDocSnap = await Promise.race([
      getDoc(userDocRef),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Firestore request timeout")), 5000)
      )
    ]) as any;

    if (!userDocSnap.exists()) {
      // Create new profile
      await Promise.race([
        setDoc(userDocRef, {
          uid,
          email,
          displayName: additionalData?.displayName || "",
          photoURL: additionalData?.photoURL || "",
          bio: additionalData?.bio || "",
          phoneNumber: additionalData?.phoneNumber || "",
          preferences: additionalData?.preferences || {},
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Firestore write timeout")), 5000)
        )
      ]);
    } else {
      // Update existing profile
      await Promise.race([
        updateDoc(userDocRef, {
          ...additionalData,
          updatedAt: serverTimestamp(),
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Firestore update timeout")), 5000)
        )
      ]);
    }
  } catch (error: any) {
    // Don't throw - just log the error
    // This ensures authentication still works even if Firestore is unavailable
    if (error?.code === "unavailable" || error?.message?.includes("offline") || error?.message?.includes("timeout")) {
      console.warn("Firestore is offline or unavailable. User profile will be created when Firestore is available.");
    } else {
      console.error("Error creating user profile:", error);
    }
    // Silently fail - don't block authentication
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  uid: string,
  updates: UserProfileUpdate
): Promise<void> {
  if (!db) {
    throw new Error("Firestore is not initialized");
  }

  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

/**
 * Delete user profile
 */
export async function deleteUserProfile(uid: string): Promise<void> {
  if (!db) {
    throw new Error("Firestore is not initialized");
  }

  try {
    const userDocRef = doc(db, "users", uid);
    await deleteDoc(userDocRef);
  } catch (error) {
    console.error("Error deleting user profile:", error);
    throw error;
  }
}

/**
 * Upload user profile image
 */
export async function uploadProfileImage(
  uid: string,
  file: File
): Promise<string> {
  if (!storage) {
    throw new Error("Firebase Storage is not initialized");
  }

  try {
    // Create a reference to the file location
    const fileRef = ref(storage, `users/${uid}/profile/${file.name}`);
    
    // Upload the file
    await uploadBytes(fileRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(fileRef);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error;
  }
}

/**
 * Delete user profile image
 */
export async function deleteProfileImage(imagePath: string): Promise<void> {
  if (!storage) {
    throw new Error("Firebase Storage is not initialized");
  }

  try {
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting profile image:", error);
    throw error;
  }
}

/**
 * Search users by display name or email
 */
export async function searchUsers(searchTerm: string): Promise<UserProfile[]> {
  if (!db) {
    throw new Error("Firestore is not initialized");
  }

  try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("displayName", ">=", searchTerm),
      where("displayName", "<=", searchTerm + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);
    const users: UserProfile[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      users.push({
        uid: data.uid,
        email: data.email,
        displayName: data.displayName,
        photoURL: data.photoURL,
        bio: data.bio,
        phoneNumber: data.phoneNumber,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        preferences: data.preferences || {},
      });
    });

    return users;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
}

