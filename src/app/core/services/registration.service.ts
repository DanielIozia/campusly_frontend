import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as Registration_Models from '../models/register.models';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';


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
  constructor(private http: HttpClient) {}

  sendOtp(request: Registration_Models.SendOtp_Request): Observable<Registration_Models.SendOtp_ResponseData> {
    return this.http.post<Registration_Models.SendOtp_ResponseData>(`${this.baseUrl}/send-otp`, request);
  }

  verifyOtp(request: Registration_Models.VerifyOtp_Request): Observable<Registration_Models.VerifyOtp_ResponseData> {
    return this.http.post<Registration_Models.VerifyOtp_ResponseData>(`${this.baseUrl}/verify-otp`, request);
  }

  completeRegistration(request: Registration_Models.CompleteRegistration_Request): Observable<Registration_Models.CompleteRegistration_ResponseData> {
    return this.http.post<Registration_Models.CompleteRegistration_ResponseData>(`${this.baseUrl}/complete`, request).pipe(
      tap(res => {
        if (res.data) {
          // res.data è Login_Response
          this.authService["currentUser"].set(res);
        }
      })
    );
  }

  resendOtp(request: Registration_Models.ResendOtp_Request): Observable<Registration_Models.ResendOtp_ResponseData> {
    return this.http.post<Registration_Models.ResendOtp_ResponseData>(`${this.baseUrl}/resend-otp`, request);
  }

}

