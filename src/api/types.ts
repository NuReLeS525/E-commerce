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