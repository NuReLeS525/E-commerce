import apiClient from './client';
import { Trader, ApproveTraderRequest, RejectTraderRequest } from './types';

export const tradersApi = {
  // GET /api/v1/admin/traders/pending
  getPending: () => 
    apiClient.get<Trader[]>('/admin/traders/pending'),

  // POST /api/v1/admin/traders/{id}/approve
  approve: (id: number, data?: ApproveTraderRequest) => 
    apiClient.post(`/admin/traders/${id}/approve`, data),

  // POST /api/v1/admin/traders/{id}/reject
  reject: (id: number, data: RejectTraderRequest) => 
    apiClient.post(`/admin/traders/${id}/reject`, data),
};