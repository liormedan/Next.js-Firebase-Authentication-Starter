export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  bio?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  preferences?: {
    theme?: "light" | "dark" | "auto";
    language?: string;
    notifications?: boolean;
  };
}

export interface UserProfileUpdate {
  displayName?: string;
  bio?: string;
  phoneNumber?: string;
  photoURL?: string;
  preferences?: {
    theme?: "light" | "dark" | "auto";
    language?: string;
    notifications?: boolean;
  };
}

