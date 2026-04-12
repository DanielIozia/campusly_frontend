import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiBase_Response } from '../models/api.interfaces';
import * as Auth_Models from '../models/auth.models';
import { ToasterService } from './toaster.service';



/*
=====================================
            ENDPOINTS:
  - POST /auth/login
  - GET /auth/me
  - POST /auth/logout
=====================================
*/


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private currentUser = signal<Auth_Models.Login_ResponseData | null>(null);
  private router = inject(Router);
  private toasterService = inject(ToasterService);
  private authChecked = signal(false);

  isLoggedIn = computed(() => this.currentUser() !== null);
  isAuthChecked = computed(() => this.authChecked());
  user = computed(() => this.currentUser());

  constructor(private http: HttpClient) { }

  login(data: Auth_Models.Login_Request): Observable<ApiBase_Response<Auth_Models.Me_ResponseData>> {
    return this.http.post<ApiBase_Response<Auth_Models.Me_ResponseData>>(`${this.baseUrl}/login`, data).pipe(
      tap({
        next: (res) => {
          this.currentUser.set(res.data);
        },
        error: (err: HttpErrorResponse) => {
          this.toasterService.sendErrorToast(err);
        }
      }
      )
    );
  }

  me(): Observable<ApiBase_Response<Auth_Models.Me_ResponseData>> {
    return this.http.get<ApiBase_Response<Auth_Models.Me_ResponseData>>(`${this.baseUrl}/me`).pipe(
      tap({
        next: (res) => {
          this.currentUser.set(res.data);
          this.authChecked.set(true);

        },
        error: (err: HttpErrorResponse) => {
          this.currentUser.set(null);
          this.authChecked.set(false);
        },
      })
    );
  }

  logout(): void {
    this.http.post<ApiBase_Response<null>>(`${this.baseUrl}/logout`, {}).subscribe({
      next: () => this.clearSessionAndRedirect(),
      error: () => this.clearSessionAndRedirect(),
    });
  }

  forgotPassword(request: Auth_Models.ForgotPassword_Request): Observable<ApiBase_Response<null>> {
    return this.http.post<ApiBase_Response<null>>(`${this.baseUrl}/forgot-password`, request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          this.toasterService.sendErrorToast(err);
        }
      })
    );
  }

  verifyPasswordOtp(request: Auth_Models.VerifyPasswordOtp_Request): Observable<ApiBase_Response<null>> {
    return this.http.post<ApiBase_Response<null>>(`${this.baseUrl}/verify-password-otp`, request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          this.toasterService.sendErrorToast(err);
        }
      })
    );
  }

  resetPassword(request: Auth_Models.ResetPassword_Request): Observable<ApiBase_Response<Auth_Models.ResetPassword_ResponseData>> {
    return this.http.post<ApiBase_Response<Auth_Models.ResetPassword_ResponseData>>(`${this.baseUrl}/reset-password`, request).pipe(
      tap({
        next: (res) => {
          this.currentUser.set(res.data);
        },
        error: (err: HttpErrorResponse) => {
          this.toasterService.sendErrorToast(err);
        }
      })
    );
  }





  // ===================================
  //          PRIVATE METHODS
  // ===================================
  private clearSessionAndRedirect(): void {
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }


  //! TODO GOOGLE LOGIN
  // loginWithGoogle(): void {
  //   window.location.href = `${environment.apiUrl.replace('/api', '')}/oauth2/authorization/google`;
  // }

  //   handleOAuthCallback(): Observable<ApiBase_Response<null>> {
  //     this.http.get<ApiBase_Response<null>>(`${this.baseUrl}/me`).subscribe({
  //       next: (res) => {
  //         this.router.navigate(['/feed']);
  //       }
  //     }),
  //       error: () => {
  //         this.router.navigate(['/auth/login']);
  //       },
  //     };
  // }
}

