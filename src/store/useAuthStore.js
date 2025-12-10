import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const useAuthStore = create((set, get) => ({
  authUser: null,

  isLoggingIn: false,
  isVerifyingOtp: false,
  needOtp: false,
  tempUsername: null,
  isRegistering: false,

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      await axios.post("/login", data);

      set({
        needOtp: true,
        tempUsername: data.username,
      });

      toast.success("OTP sent to your email");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  verifyOtp: async (otp) => {
    set({ isVerifyingOtp: true });

    try {
      const username = get().tempUsername;

      const res = await axios.post("/login/otp", {
        username,
        otp,
      });

      localStorage.setItem("accessToken", res.data.accessToken);

      set({
        authUser: { username },
        needOtp: false,
        tempUsername: null,
      });

      toast.success("Logged in successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      set({ isVerifyingOtp: false });
    }
  },

  register: async (data) => {
    set({ isRegistering: true });

    try {
      await axios.post("/register", data);
      toast.success("Account created! Now login.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      set({ isRegistering: false });
    }
  },
}));
