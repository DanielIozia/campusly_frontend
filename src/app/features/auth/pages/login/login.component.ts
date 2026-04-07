import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ApiError } from '../../../../core/models/auth.models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, FormErrorComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string | null = null;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    onSubmit(): void {
        if (!this.loginForm.valid) return;

        this.loading = true;
        this.errorMessage = null;

        this.authService.login(this.loginForm.value).subscribe({
            next: () => {
                this.router.navigate(['/feed']);
            },
            error: (err: HttpErrorResponse) => {
                this.loading = false;
                const apiError = err.error as ApiError;
                this.errorMessage = apiError?.content || 'Errore durante il login';
            }
        });
    }

    loginWithGoogle(): void {
        this.authService.loginWithGoogle();
    }
}
