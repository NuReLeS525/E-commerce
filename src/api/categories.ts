import apiClient from './client';
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from '../types';

export const categoriesApi = {
  // GET /api/v1/admin/categories
  getAll: () => 
    apiClient.get<Category[]>('/admin/categories'),

  // GET /api/v1/admin/categories/{id}
  getById: (id: number) => 
    apiClient.get<Category>(`/admin/categories/${id}`),

  // POST /api/v1/admin/categories
  create: (data: CreateCategoryRequest) => 
    apiClient.post<Category>('/admin/categories', data),

  // PUT /api/v1/admin/categories/{id}
  update: (id: number, data: UpdateCategoryRequest) => 
    apiClient.put<Category>(`/admin/categories/${id}`, data),

  // DELETE /api/v1/admin/categories/{id}
  delete: (id: number) => 
    apiClient.delete(`/admin/categories/${id}`),
};