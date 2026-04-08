export interface RegisterRequest {
  name: string;
  surname: string;
  dateOfBirth: {
    day: number;
    month: number;
    year: number;
  };
  email: string;
  password: string;
  telephone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  dateOfBirth: string | null;
  telephone: string | null;
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
