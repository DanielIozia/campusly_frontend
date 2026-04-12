import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../../core/services/auth.service';
import { ApiBase_Response } from '../../../../core/models/api.interfaces';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        FormErrorComponent
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    public showPassword = false;

    public form: FormGroup;
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
        const request = {
            email: this.form.get('email')?.value,
            password: this.form.get('password')?.value
        }
        this.authService.login(request)
            .pipe(
                finalize(() => this.isLoading.set(false))
            )
            .subscribe(res => {
                this.router.navigate(['/feed']);
            });
    }

    togglePassword(): void {
        this.showPassword = !this.showPassword;
    }

    public featureNotImplemented(): void {
        alert('Funzionalità non ancora implementata');
    }
}
