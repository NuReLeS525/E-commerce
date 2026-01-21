import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiPublic from "../lib/apiPublic";
import toast from "react-hot-toast";

export const useAuthStore = create(
  persist(
    (set, get) => ({
  authUser: null,
  accessToken: null,
  refreshToken: null,
  isLoggingIn: false,
  isRegistering: false,
  isAuthenticated: false,
  isCheckingAuth: true,
  isVerifyingOtp: false,

  traderRegister: async (data) => {
    set({ isRegistering: true });
    try {
      const res = await apiPublic.post("/auth/register-trader", data);
      toast.success("Trader registered successfully! Please login.");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      return false;
    } finally {
      set({ isRegistering: false });
    }
  },

  registerCustomer: async (customerData) => {
    try {
      const token = get().accessToken;
      const res = await apiPublic.post(
        "/auth/register-customer",
        customerData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Customer created successfully!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create customer");
      return false;
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await apiPublic.post("/auth/login", data);
      const { accessToken, refreshToken, role, userId, isOtpRequired } = res.data;
      
      if (isOtpRequired) {
        set({
          authUser: { username: data.fullName, role, userId },
          isAuthenticated: false, 
        });
        return { success: true, otpRequired: true };
      }

      set({
        accessToken,
        refreshToken,
        authUser: { username: data.fullName, role, userId },
        isAuthenticated: true,
      });
      toast.success("Login successful!");
      return { success: true, otpRequired: false };
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("Access Denied: Account might be pending approval or disabled.");
      } else {
        toast.error(err.response?.data?.message || "Invalid credentials");
      }
      return { success: false, otpRequired: false };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  verifyOtp: async (otp) => {
    set({ isVerifyingOtp: true });
    try {
      const username = get().authUser?.username;
      if (!username) {
        toast.error("Please login first");
        return false;
      }

      const res = await apiPublic.post("/auth/login/otp", {
        username,
        otp,
      });

      const { accessToken, refreshToken, role, userId } = res.data;
      
      set({
        accessToken,
        refreshToken,
        authUser: { username, role, userId },
        isAuthenticated: true,
      });
      
      toast.success("OTP verified successfully!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP");
      return false;
    } finally {
      set({ isVerifyingOtp: false });
    }
  },

  logout: async () => {
    try {
      const token = get().accessToken;
      if (token) {
        await apiPublic.post(
          "/auth/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      set({
        authUser: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      });
      toast.success("Logged out");
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const rt = get().refreshToken;
      if (!rt) throw new Error("No refresh token");

      const res = await apiPublic.post("/auth/refresh", {
        refreshToken: rt,
      });

      set({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        isAuthenticated: true,
      });
    } catch (error) {
      console.log(error)
      set({ isAuthenticated: false, authUser: null, accessToken: null, refreshToken: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}),
    {
      name: "auth-storage",
      partialize: (state) => ({
        authUser: state.authUser,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
