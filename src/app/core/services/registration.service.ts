import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as Registration_Models from '../models/register.models';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { ToasterService } from './toaster.service';


/*
=====================================
            ENDPOINTS:
  - POST /register/send-otp
  - POST /register/verify-otp
  - POST /register/resend-otp
  - POST /register/complete
=====================================
*/

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private readonly baseUrl = `${environment.apiUrl}/register`;

  private authService = inject(AuthService);
  constructor(
    private http: HttpClient,
    private toasterService: ToasterService
  ) { }

  sendOtp(request: Registration_Models.SendOtp_Request): Observable<Registration_Models.SendOtp_ResponseData> {
    return this.http.post<Registration_Models.SendOtp_ResponseData>(`${this.baseUrl}/send-otp`, request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          this.toasterService.sendErrorToast(err);
        }
      })
    );
  }

  verifyOtp(request: Registration_Models.VerifyOtp_Request): Observable<Registration_Models.VerifyOtp_ResponseData> {
    return this.http.post<Registration_Models.VerifyOtp_ResponseData>(`${this.baseUrl}/verify-otp`, request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          this.toasterService.sendErrorToast(err);
        }
      })
    );
  }

  completeRegistration(request: Registration_Models.CompleteRegistration_Request): Observable<Registration_Models.CompleteRegistration_ResponseData> {
    return this.http.post<Registration_Models.CompleteRegistration_ResponseData>(`${this.baseUrl}/complete`, request).pipe(
      tap({
        next: (res) => {
          this.authService["currentUser"].set(res);
          this.toasterService.success('Registrazione completata', 'Benvenuto su Campusly!');
        },
        error: (err: HttpErrorResponse) => {
          this.toasterService.sendErrorToast(err);
        }
      })
    );
  }

  resendOtp(request: Registration_Models.ResendOtp_Request): Observable<Registration_Models.ResendOtp_ResponseData> {
    return this.http.post<Registration_Models.ResendOtp_ResponseData>(`${this.baseUrl}/resend-otp`, request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          this.toasterService.sendErrorToast(err);
        }
      })
    );
  }

}

