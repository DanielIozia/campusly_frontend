import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component';
import { RegistrationService } from '../../../../core/services/registration.service';
import { UniversityService } from '../../../../core/services/university.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormErrorService } from '../../../../core/services/form-error.service';
import * as Registration_Models from '../../../../core/models/register.models';
import { OtpInputComponent } from '../../../../shared/components/otp-input/otp-input.component';
import { UniversityModalComponent } from '../../../../shared/components/university-modal/university-modal.component';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormErrorComponent,
    OtpInputComponent,
    UniversityModalComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public showModal = signal<views>('send_email');
  public showUniversityModal = signal(false);

  public sendEmail: FormGroup;
  public otpCode: FormGroup;
  public info: FormGroup;
  public showPassword = false;
  public showConfirmPassword = false;
  public loading = signal(false);

  days = Array.from({ length: 31 }, (_, i) => i + 1);
  months = [
    { value: 1, label: 'Gennaio' },
    { value: 2, label: 'Febbraio' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Aprile' },
    { value: 5, label: 'Maggio' },
    { value: 6, label: 'Giugno' },
    { value: 7, label: 'Luglio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Settembre' },
    { value: 10, label: 'Ottobre' },
    { value: 11, label: 'Novembre' },
    { value: 12, label: 'Dicembre' },
  ];
  years: number[] = [];

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private universityService: UniversityService,
    private authService: AuthService,
    private formErrorService: FormErrorService,
    private router: Router,
  ) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    this.sendEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.otpCode = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    });
    this.info = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      birthDay: ['', [Validators.required]],
      birthMonth: ['', [Validators.required]],
      birthYear: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: this.formErrorService.passwordMatchValidator })
  }


  onSendEmail(): void {
    if (!this.sendEmail.valid) return;

    this.loading.set(true);
    const request: Registration_Models.SendOtp_Request = {
      email: this.sendEmail.get('email')?.value
    }

    this.registrationService.sendOtp(request)
    .pipe(
      finalize(() => this.loading.set(false))
    )
    .subscribe({
      next: () => {
        this.showModal.set('otp_code');
      },
      error: () => {}
    });
  }

  resendOtp(): void {
    if(!this.sendEmail.valid) return;

    this.loading.set(true);
    const request: Registration_Models.ResendOtp_Request = {
      email: this.sendEmail.get('email')?.value
    }
    this.registrationService.resendOtp(request)
    .pipe(
      finalize(() => this.loading.set(false))
    )
    .subscribe({
      next: () => {
        if(this.showModal() !== 'otp_code') {
          this.showModal.set('otp_code');
        }
      },
      error: () => {}
    });
  }

  onVerifyOtp(): void {
    if (!this.otpCode.valid) return;

    this.loading.set(true);
    const request: Registration_Models.VerifyOtp_Request = {
      email: this.sendEmail.get('email')?.value,
      otpCode: this.otpCode.get('otp')?.value
    }

    this.registrationService.verifyOtp(request)
    .pipe(
      finalize(() => this.loading.set(false))
    )
    .subscribe({
      next: () => {
        this.showModal.set('personal_data');
      },
      error: () => {}
    });
  }

  onPersonalDataSubmit(): void {
    if (!this.info.valid) return;

    this.loading.set(true);

    const request: Registration_Models.CompleteRegistration_Request = {
      email: this.sendEmail.get('email')?.value,
      password: this.info.get('password')?.value,
      firstName: this.info.get('firstName')?.value,
      lastName: this.info.get('lastName')?.value,
      username: this.info.get('username')?.value,
      birthDate: {
        day: Number(this.info.get('birthDay')?.value),
        month: Number(this.info.get('birthMonth')?.value),
        year: Number(this.info.get('birthYear')?.value),
      }
    }

    this.registrationService.completeRegistration(request)
    .pipe(
      finalize(() => this.loading.set(false))
    )
    .subscribe({
      next: () => {
        this.showUniversityModal.set(true);
      },
      error: () => {}
    });
  }

  onUniversitySelected(universityId: string): void {
    this.universityService.setUserUniversity(universityId).subscribe({
      next: () => {
        this.authService.updateUniversityId(universityId);
        this.showUniversityModal.set(false);
        this.router.navigate(['/feed']);
      },
      error: () => {
        this.showUniversityModal.set(false);
        this.router.navigate(['/feed']);
      }
    });
  }

  onUniversitySkipped(): void {
    this.showUniversityModal.set(false);
    this.router.navigate(['/feed']);
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}

type views = 'send_email' | 'otp_code' | 'personal_data';
