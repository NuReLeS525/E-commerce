import apiClient from './client';
import { Product, CreateProductRequest, UpdateProductRequest } from './types';

export const productsApi = {
  // GET /api/v1/admin/products
  getAll: () => 
    apiClient.get<Product[]>('/admin/products'),

  // GET /api/v1/admin/products/{id}
  getById: (id: number) => 
    apiClient.get<Product>(`/admin/products/${id}`),

  // POST /api/v1/admin/products
  create: (data: CreateProductRequest) => 
    apiClient.post<Product>('/admin/products', data),

  // PUT /api/v1/admin/products/{id}
  update: (id: number, data: CreateProductRequest) => 
    apiClient.put<Product>(`/admin/products/${id}`, data),

  // DELETE /api/v1/admin/products/{id}
  delete: (id: number) => 
    apiClient.delete(`/admin/products/${id}`),
};