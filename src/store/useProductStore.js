import { create } from "zustand";
import apiPublic from "../lib/apiPublic";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  products: [],
  currentProduct: null,
  isLoadingProducts: false,
  isLoadingProduct: false,

  getProducts: async () => {
    set({ isLoadingProducts: true });
    try {
      const response = await apiPublic.get("/products");
      const backendProducts = response.data;

      const products = backendProducts.map((product) => ({
        id: product.id,
        title: product.name,
        description: product.description || "",
        price: parseFloat(product.price),
        category: product.categoryName || "Uncategorized",
        image: `https://via.placeholder.com/400x400?text=${encodeURIComponent(product.name)}`,
        rating: { rate: 4.5, count: Math.floor(Math.random() * 100) + 10 },
      }));

      set({ products });
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
      return [];
    } finally {
      set({ isLoadingProducts: false });
    }
  },

  getProductById: async (id) => {
    set({ isLoadingProduct: true });
    try {
      const response = await apiPublic.get(`/products/${id}`);
      const product = response.data;

      const mappedProduct = {
        id: product.id,
        title: product.name,
        description: product.description || "",
        price: parseFloat(product.price),
        category: product.categoryName || "Uncategorized",
        image: `https://via.placeholder.com/400x400?text=${encodeURIComponent(product.name)}`,
        rating: { rate: 4.5, count: Math.floor(Math.random() * 100) + 10 },
      };

      set({ currentProduct: mappedProduct });
      return mappedProduct;
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product");
      return null;
    } finally {
      set({ isLoadingProduct: false });
    }
  },

  clearCurrentProduct: () => set({ currentProduct: null }),
}));
