import apiClient from '../client';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;      // обрати внимание - accessToken, а не token!
  refreshToken: string;
  role: string;
  userId: number;
  isOtpRequired: boolean;
  otpExpiresInSeconds: number | null;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  message?: string;
}

export const authApi = {
  login: (data: LoginRequest) => 
    apiClient.post<LoginResponse>('/auth/login', data),
  
  register: (data: RegisterRequest) => 
    apiClient.post<RegisterResponse>('/auth/register', data),
  
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken'); // добавим и refreshToken
    window.location.href = '/login';
  }
};