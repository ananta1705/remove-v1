export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "petugas" | "pembeli";
  phone?: string;
  address?: string;
  avatar?: string;
}

export interface Waste {
  id: string;
  type: string;
  weight: number;
  date: string;
  points: number;
  status: "pending" | "processed" | "completed";
}

export interface Transaction {
  id: string;
  userId: string;
  type: "earn" | "redeem" | "purchase";
  amount: number;
  date: string;
  status: "success" | "pending" | "failed";
}

export interface Payment {
  id: string;
  transactionId: string;
  method: "qris" | "bank_transfer" | "cash";
  amount: number;
  status: "success" | "pending" | "failed";
  paymentDate?: string;
}

export interface TPS {
  id: number;
  name: string;
  address: string;
  volume: string;
  status: "Normal" | "Peringatan" | "Penuh";
  capacity: string;
  lastUpdate: string;
  coordinates: { x: number; y: number };
  active: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}
