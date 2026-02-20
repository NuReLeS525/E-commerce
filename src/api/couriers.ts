import apiClient from './client';
import { Courier, CreateCourierRequest } from './types';

export const couriersApi = {
  // GET /api/v1/admin/couriers
  getAll: () => 
    apiClient.get<Courier[]>('/admin/couriers'),

  // POST /api/v1/admin/couriers
  create: (data: CreateCourierRequest) => 
    apiClient.post<Courier>('/admin/couriers', data),

  // PUT /api/v1/admin/couriers/{id}
  update: (id: number, data: CreateCourierRequest) => 
    apiClient.put<Courier>(`/admin/couriers/${id}`, data),

  // DELETE /api/v1/admin/couriers/{id}
  delete: (id: number) => 
    apiClient.delete(`/admin/couriers/${id}`),
};