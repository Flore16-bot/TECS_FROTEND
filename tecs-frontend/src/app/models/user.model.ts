// src/app/models/user.model.ts
export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  nombreCompleto: string;
  telefono: string;
  institucion: string;
  avatar?: string;
  numeroTrabajador?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username?: string;
  email: string;
  password: string;
  nombreCompleto: string;
  telefono: string;
  institucion: string;
  role?: 'admin' | 'user';
  adminKey?: string;
  numeroTrabajador?: string;
}

export interface UserUpdateData {
  username?: string;
  email?: string;
  nombreCompleto?: string;
  telefono?: string;
  institucion?: string;
  avatar?: string;
}