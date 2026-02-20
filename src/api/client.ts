import axios, { InternalAxiosRequestConfig } from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен к каждому запросу
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обрабатываем ошибки
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Токен протух — можно сделать refresh
      console.log('Токен истёк, нужно перелогиниться');
      // Здесь логика refresh token
    }
    return Promise.reject(error);
  }
);

export default apiClient;