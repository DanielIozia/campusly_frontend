import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import * as Auth_Models from '../../../../core/models/auth.models';
import { OtpInputComponent } from '../../../../shared/components/otp-input/otp-input.component';
import { FormErrorService } from '../../../../core/services/form-error.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormErrorComponent,
        OtpInputComponent,
        MatIconModule
    ],
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

    public showPassword = false;
    public showConfirmPassword = false;
    public sendEmail: FormGroup;
    public otpCode: FormGroup;
    public newPassword: FormGroup;
    public showModal = signal<views>('send_email');

    constructor(
        private authService: AuthService,
        private formErrorService: FormErrorService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder) {
        this.sendEmail = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
        this.otpCode = this.fb.group({
            otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        });
        this.newPassword = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        }, { validators: this.formErrorService.passwordMatchValidator });
    }

    onSendEmail(): void {
        if (!this.sendEmail.valid) return;

        const request: Auth_Models.ForgotPassword_Request = {
            email: this.sendEmail.get('email')?.value
        }
        this.authService.forgotPassword(request).subscribe({
            next: () => {
                this.showModal.set('otp_code');
            },
            error: (err) => { } //! show toaster }
        });

    }

    onVerifyOtp(): void {
        if (!this.otpCode.valid) return;

        const request: Auth_Models.VerifyPasswordOtp_Request = {
            email: this.sendEmail.get('email')?.value,
            otpCode: this.otpCode.get('otp')?.value
        }

        this.authService.verifyPasswordOtp(request).subscribe({
            next: () => {
                this.showModal.set('new_password');
            },
            error: (err) => { } //! show toaster }
        });

    }

    onSubmitNewPassword(): void {

        if (!this.newPassword.valid) return;

        const request: Auth_Models.ResetPassword_Request = {
            email: this.sendEmail.get('email')?.value,
            newPassword: this.newPassword.get('password')?.value
        }

        this.authService.resetPassword(request).subscribe({
            next: () => {
                this.router.navigate(['feed']);
            },
            error: (err) => { } //! show toaster }
        });
    }

    goToLogin(): void {
        this.router.navigate(['auth/login']);
    }

    togglePassword(): void {
        this.showPassword = !this.showPassword;
    }
}

// INTERFACES AND TYPES
type views = 'send_email' | 'otp_code' | 'new_password';

