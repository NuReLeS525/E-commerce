  // src/api/hooks/useUsers.ts
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
  import { userService } from '../services/userService';
  import { ApiError } from '../types/api';
  import { User, CreateUserDto, UpdateUserDto } from '../types/user.types';

  export const useUsers = (params?: Record<string, any>) => {
    return useQuery({
      queryKey: ['users', params],
      queryFn: () => userService.getUsers(params),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  export const useUser = (id: string) => {
    return useQuery({
      queryKey: ['user', id],
      queryFn: () => userService.getUserById(id),
      enabled: !!id,
    });
  };

  export const useCreateUser = () => {
    const queryClient = useQueryClient();
    
    return useMutation<User, ApiError, CreateUserDto>({
      mutationFn: (userData) => userService.createUser(userData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    });
  };

  export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    
    return useMutation<User, ApiError, { id: string; data: UpdateUserDto }>({
      mutationFn: ({ id, data }) => userService.updateUser(id, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
      },
    });
  };