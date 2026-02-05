import { http } from "./http";

export const productsApi = {
  getAll() {
    return http.get("/api/v1/admin/products");
  },

  getById(id: number) {
    return http.get(`/api/v1/admin/products/${id}`);
  },

  create(data: any) {
    return http.post("/api/v1/admin/products", data);
  },

  update(id: number, data: any) {
    return http.put(`/api/v1/admin/products/${id}`, data);
  },

  remove(id: number) {
    return http.delete(`/api/v1/admin/products/${id}`);
  },
};
