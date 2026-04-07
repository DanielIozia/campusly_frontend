export interface RegisterRequest {
  nome: string;
  cognome: string;
  dataNascita: {
    giorno: number;
    mese: number;
    anno: number;
  };
  email: string;
  password: string;
  telefono?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  username: string;
  nome: string;
  cognome: string;
  email: string;
  dataNascita: string | null;
  telefono: string | null;
  photoUrl: string | null;
  bio: string | null;
  role: 'STUDENT';
  authProvider: 'LOCAL' | 'GOOGLE';
  createdAt: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  httpMethod: string;
  status: number;
  title: string;
  content: string;
  errors: ValidationError[];
  timestamp: string;
}
