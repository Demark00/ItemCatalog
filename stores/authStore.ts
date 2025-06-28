import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { AuthStoreType } from "@/types/user-type";
import toast from "react-hot-toast";

const useAuthStore = create<AuthStoreType>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const response = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: response.data.user });
    } catch (error) {
      set({ authUser: null, isCheckingAuth: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (userData, router) => {
    try {
      set({ isSigningUp: true });
      const response = await axiosInstance.post("/auth/signup", userData);
      set({ authUser: response.data.user });
      toast.success("Account created successfully!");
      router.push("/");
    } catch (error) {
      set({ authUser: null, isSigningUp: false });
      toast.error("Error signing up. Please try again.");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (credentials, router) => {
    try {
      set({ isLoggingIn: true });
      const response = await axiosInstance.post("/auth/login", credentials);
      set({ authUser: response.data.user });
      toast.success("Logged in successfully!");
      router.push("/");
    } catch (error) {
      set({ authUser: null, isLoggingIn: false });
      toast.error("Invalid Login Credentials");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Logout error:", error);
    }
  },
}));

export default useAuthStore;
