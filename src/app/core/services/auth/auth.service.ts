import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest, RegisterRequest, UserProfile } from '../../models/auth.models';
import { ApiResponse } from '../../models/general.interfaces';

interface UserAuth {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = `${environment.apiUrl}/auth`;
  private currentUser = signal<UserAuth | null>(null);
  private router = inject(Router);
  private authChecked = signal(false);

  isLoggedIn = computed(() => this.currentUser() !== null);
  isAuthChecked = computed(() => this.authChecked());
  user = computed(() => this.currentUser());

  constructor(private http: HttpClient) { }

  checkAuth(): void {
    this.http.get<ApiResponse<UserProfile>>(`${this.authUrl}/me`).subscribe({
      next: (res) => {
        this.currentUser.set({ id: res.data.id, name: res.data.name, email: res.data.email });
        this.authChecked.set(true);
      },
      error: () => {
        this.currentUser.set(null);
        this.authChecked.set(true);
      },
    });
  }

  login(data: LoginRequest): Observable<ApiResponse<UserAuth>> {
    return this.http.post<ApiResponse<UserAuth>>(`${this.authUrl}/login`, data).pipe(
      tap(res => this.currentUser.set(res.data))
    );
  }

  register(data: RegisterRequest): Observable<ApiResponse<UserAuth>> {
    return this.http.post<ApiResponse<UserAuth>>(`${this.authUrl}/register`, data).pipe(
      tap(res => this.currentUser.set(res.data))
    );
  }

  getMe(): Observable<ApiResponse<UserProfile>> {
    return this.http.get<ApiResponse<UserProfile>>(`${this.authUrl}/me`);
  }

  loginWithGoogle(): void {
    window.location.href = `${environment.apiUrl.replace('/api', '')}/oauth2/authorization/google`;
  }

  handleOAuthCallback(): void {
    this.http.get<ApiResponse<UserProfile>>(`${this.authUrl}/me`).subscribe({
      next: (res) => {
        this.currentUser.set({ id: res.data.id, name: res.data.name, email: res.data.email });
        this.router.navigate(['/feed']);
      },
      error: () => {
        this.router.navigate(['/auth/login']);
      },
    });
  }

  logout(): void {
    this.http.post(`${this.authUrl}/logout`, {}).subscribe({
      next: () => this.clearSessionAndRedirect(),
      error: () => this.clearSessionAndRedirect(),
    });
  }

  private clearSessionAndRedirect(): void {
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }
}
