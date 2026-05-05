// ============ ПОЛЬЗОВАТЕЛИ И КУРЬЕРЫ ============

export interface UserEntity {
  id: number;
  email: string;
  fullName: string;
  username?: string;
  active: boolean;
  approved: boolean;
  verified?: boolean;
}

export interface Courier {
  id: number;
  userEntity: UserEntity;
}

export interface CreateCourierRequest {
  userId: number;
}

// ============ ПРОДУКТЫ ============

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  categoryName?: string;
  stockQuantity: number;
  imageUrl?: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  stockQuantity: number;
  imageUrl?: string;
  active?: boolean;
}

export interface UpdateProductRequest extends CreateProductRequest {
  id: number;
}

// ============ ЗАКАЗЫ (ORDERS) - РЕАЛЬНАЯ СТРУКТУРА ============

export interface Order {
  id: number;
  customerEntity: CustomerEntity;
  city: string;
  address: string;
  createdAt: string;
  totalPrice: number;
  status: OrderStatus;
  trader: TraderEntity;
  orderItems: OrderItemEntity[];
}

export interface CustomerEntity {
  id: number;
  userEntity: UserEntity;
  address: string;
  city?: string;
}

export interface TraderEntity {
  id: number;
  email: string;
  fullName: string;
  username: string;
  roles: Role[];
  otpEnabled: boolean;
  otpCode?: string | null;
  otpExpiresAt?: string | null;
  otpAttempts: number;
  createdAt: string;
  updatedAt: string | null;
  apiKey?: string;
  active: boolean;
  approved: boolean;
  rejected: boolean;
  verified: boolean;
}

export interface Role {
  id: number;
  name: string;
}

export interface OrderItemEntity {
  id: number;
  product: ProductEntity;
  quantity: number;
  currentPrice: number;
}

export interface ProductEntity {
  id: number;
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  category: Category;
  trader: TraderEntity;
}

export interface Category {
  id: number;
  name: string;
}

export type OrderStatus = 'ASSIGNED' | 'ACCEPTED' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED';

export interface UpdateOrderRequest {
  status?: OrderStatus;
}

// ============ ТРЕЙДЕРЫ ============

export interface Trader {
  id: number;
  userEntity: UserEntity;
  companyName?: string;
  registrationNumber?: string;
  phone?: string;
  address?: string;
  status: TraderStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: number;
  rejectionReason?: string;
  documents?: TraderDocument[];
}

export interface TraderDocument {
  id: number;
  fileName: string;
  fileUrl: string;
  documentType: string;
  uploadedAt: string;
}

export type TraderStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ApproveTraderRequest {
  notes?: string;
}

export interface RejectTraderRequest {
  reason: string;
}

// ============ КАТЕГОРИИ ============

export interface Category {
  id: number;
  name: string;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  name: string;
}