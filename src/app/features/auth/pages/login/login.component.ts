import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../../core/services/auth.service';
import { ApiBase_Response } from '../../../../core/models/api.interfaces';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, FormErrorComponent],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    public form: FormGroup;
    public errorMessage: string | null = null;
    public isLoading = signal(false);

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    onLogin(): void {
        if (!this.form.valid) return;

        this.isLoading.set(true);
        this.errorMessage = null;

        this.authService.login(this.form.value).subscribe({
            next: () => {
                this.router.navigate(['/feed']);
            },
            error: (err: HttpErrorResponse) => {
                this.isLoading.set(false);
                const apiError = err.error as ApiBase_Response<null>;
                this.errorMessage = apiError?.error?.message || 'Errore durante il login';
            }
        });
    }

    public featureNotImplemented(): void {
        alert('Funzionalità non ancora implementata');
    }
}
