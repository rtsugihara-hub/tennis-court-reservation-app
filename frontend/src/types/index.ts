// src/types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt?: string;
  updatedAt?: string;
}

export interface Court {
  id: string;
  name: string;
  type: string;
  isIndoor: boolean;
  date: string;
  timeSlot: string;
  pricePerHour: number;
  description: string;
  status: 'available' | 'maintenance';
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Reservation {
  id: string;
  userId: string;
  userName: string;
  courtId: string;
  courtName: string;
  date: string;
  timeSlot: string;
  totalPrice: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}