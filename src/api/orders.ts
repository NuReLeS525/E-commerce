import apiClient from './client';
import { Order, CreateOrderRequest, UpdateOrderRequest } from './types';

export const ordersApi = {
  // GET /api/v1/admin/orders
  getAll: () => 
    apiClient.get<Order[]>('/admin/orders'),

  // GET /api/v1/admin/orders/{id}
  getById: (id: number) => 
    apiClient.get<Order>(`/admin/orders/${id}`),

  // POST /api/v1/admin/orders
  create: (data: CreateOrderRequest) => 
    apiClient.post<Order>('/admin/orders', data),

  // PUT /api/v1/admin/orders/{id}
  update: (id: number, data: UpdateOrderRequest) => 
    apiClient.put<Order>(`/admin/orders/${id}`, data),

  // DELETE /api/v1/admin/orders/{id}
  delete: (id: number) => 
    apiClient.delete(`/admin/orders/${id}`),
};