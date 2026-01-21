import { create } from "zustand";
import apiPublic from "../lib/apiPublic";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useAdminStore = create((set, get) => ({
  pendingTraders: [],
  isLoadingTraders: false,
  products: [],
  currentProduct: null,
  isLoadingProducts: false,
  isLoadingProduct: false,
  categories: [],
  currentCategory: null,
  isLoadingCategories: false,

  getProducts: async () => {
    set({ isLoadingProducts: true });
    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error("Not authenticated");

      const res = await apiPublic.get("/admin/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ products: res.data });
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to fetch products";
      toast.error(errorMsg);
      throw err;
    } finally {
      set({ isLoadingProducts: false });
    }
  },

  getProductById: async (id) => {
    set({ isLoadingProduct: true });
    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error("Not authenticated");

      const res = await apiPublic.get(`/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ currentProduct: res.data });
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to fetch product";
      toast.error(errorMsg);
      throw err;
    } finally {
      set({ isLoadingProduct: false });
    }
  },

  createProduct: async (productData) => {
    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error("Not authenticated");

      const res = await apiPublic.post("/admin/products", productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product created successfully");
      set((state) => ({
        products: [...state.products, res.data],
      }));
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to create product";
      toast.error(errorMsg);
      throw err;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error("Not authenticated");

      const res = await apiPublic.put(`/admin/products/${id}`, productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product updated successfully");
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? res.data : p)),
        currentProduct: state.currentProduct?.id === id ? res.data : state.currentProduct,
      }));
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to update product";
      toast.error(errorMsg);
      throw err;
    }
  },

  deleteProduct: async (id) => {
    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error("Not authenticated");

      await apiPublic.delete(`/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted successfully");
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        currentProduct: state.currentProduct?.id === id ? null : state.currentProduct,
      }));
      return true;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to delete product";
      toast.error(errorMsg);
      return false;
    }
  },

  clearCurrentProduct: () => set({ currentProduct: null }),

  getPendingTraders: async () => {
    set({ isLoadingTraders: true });
    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error("Not authenticated");
      
      const res = await apiPublic.get("/admin/traders/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ pendingTraders: res.data });
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to fetch pending traders";
      toast.error(errorMsg);
      throw err;
    } finally {
      set({ isLoadingTraders: false });
    }
  },

  approveTrader: async (traderId) => {
    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error("Not authenticated");
      
      await apiPublic.post(`/admin/traders/${traderId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Trader approved successfully");
      set((state) => ({
        pendingTraders: state.pendingTraders.filter((t) => t.id !== traderId),
      }));
      return true;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to approve trader";
      toast.error(errorMsg);
      return false;
    }
  },

  rejectTrader: async (traderId) => {
    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error("Not authenticated");
      
      await apiPublic.post(`/admin/traders/${traderId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Trader rejected");
      set((state) => ({
        pendingTraders: state.pendingTraders.filter((t) => t.id !== traderId),
      }));
      return true;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to reject trader";
      toast.error(errorMsg);
      return false;
    }
  },

  getCategories: async () => {
    set({ isLoadingCategories: true });
    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error("Not authenticated");

      const res = await apiPublic.get("/admin/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ categories: res.data });
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to fetch categories";
      toast.error(errorMsg);
      throw err;
    } finally {
      set({ isLoadingCategories: false });
    }
  },

  getCategoryById: async (id) => {
    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error("Not authenticated");

      const res = await apiPublic.get(`/admin/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ currentCategory: res.data });
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to fetch category";
      toast.error(errorMsg);
      throw err;
    }
  },

  createCategory: async (categoryData) => {
    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error("Not authenticated");

      const res = await apiPublic.post("/admin/categories", categoryData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Category created successfully");
      set((state) => ({
        categories: [...state.categories, res.data],
      }));
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to create category";
      toast.error(errorMsg);
      throw err;
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error("Not authenticated");

      const res = await apiPublic.put(`/admin/categories/${id}`, categoryData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Category updated successfully");
      set((state) => ({
        categories: state.categories.map((c) => (c.id === id ? res.data : c)),
        currentCategory: state.currentCategory?.id === id ? res.data : state.currentCategory,
      }));
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to update category";
      toast.error(errorMsg);
      throw err;
    }
  },

  deleteCategory: async (id) => {
    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error("Not authenticated");

      await apiPublic.delete(`/admin/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Category deleted successfully");
      set((state) => ({
        categories: state.categories.filter((c) => c.id !== id),
        currentCategory: state.currentCategory?.id === id ? null : state.currentCategory,
      }));
      return true;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to delete category";
      toast.error(errorMsg);
      return false;
    }
  },

  clearCurrentCategory: () => set({ currentCategory: null }),
}));
