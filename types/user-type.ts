import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"; // For App Router

export interface UserType {
  _id?: string;
  email: string;
  password: string;
  fullName: string;
  role?: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
};

export interface LoginCredentials {
    email: String,
    password: String,
}

export type AuthStore = {
    logout: () => void;
    checkAuth: () => void;
    authUser: UserType | null;
};


export interface AuthStoreType {
  authUser: UserType | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;

  checkAuth: () => Promise<void>;
  signup: (user: UserType, router: AppRouterInstance) => Promise<void>;
  login: (creds: LoginCredentials, router: AppRouterInstance) => Promise<void>;
  logout: () => Promise<void>;
}
