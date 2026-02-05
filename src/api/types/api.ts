// src/api/types/api.ts
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: Record<string, string[]>;
}

// Generic hooks types
export type QueryParams = Record<string, string | number | boolean>;
export type MutationOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
};