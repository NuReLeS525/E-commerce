// src/api/index.ts
export * from './config/axios';
export * from './types/api';

// Export all services
export * as authService from './services/authService';
export * as userService from './services/userService';
export * as productService from './services/productService';

// Export hooks
export * from './hooks/useAuth';
export * from './hooks/useUsers';
export * from './hooks/useProducts';