import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse, UserProfile } from '../../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = `${environment.apiUrl}/auth`;
  private tokenSignal = signal<string | null>(this.getStoredToken());
  private router = inject(Router);

  isLoggedIn = computed(() => !!this.tokenSignal());

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, data).pipe(
      tap(res => this.storeTokens(res))
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/register`, data).pipe(
      tap(res => this.storeTokens(res))
    );
  }

  getMe(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.authUrl}/me`);
  }

  loginWithGoogle(): void {
    window.location.href = `${environment.apiUrl.replace('/api', '')}/oauth2/authorization/google`;
  }

  handleOAuthCallback(accessToken: string, refreshToken: string): void {
    this.storeTokens({ accessToken, refreshToken });
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  logout(): void {
    this.http.post(`${this.authUrl}/logout`, null).subscribe({
      complete: () => this.clearSessionAndRedirect(),
      error: () => this.clearSessionAndRedirect(),
    });
  }

  private clearSessionAndRedirect(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.tokenSignal.set(null);
    this.router.navigate(['/auth/login']);
  }

  private storeTokens(res: AuthResponse): void {
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    this.tokenSignal.set(res.accessToken);
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
