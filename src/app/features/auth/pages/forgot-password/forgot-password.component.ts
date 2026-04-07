import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, FormErrorComponent],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
    forgotForm: FormGroup;
    submitted = false;

    constructor(private fb: FormBuilder) {
        this.forgotForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    onSubmit(): void {
        if (this.forgotForm.valid) {
            this.submitted = true;
            console.log('Forgot password:', this.forgotForm.value);
        }
    }
}
