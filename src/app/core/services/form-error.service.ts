import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormErrorService {
    private messages: Record<string, (params?: any) => string> = {
        required: () => 'Campo obbligatorio',
        email: () => 'Email non valida',
        minlength: (p) => `Minimo ${p.requiredLength} caratteri`,
        maxlength: (p) => `Massimo ${p.requiredLength} caratteri`,
        min: (p) => `Il valore minimo è ${p.min}`,
        max: (p) => `Il valore massimo è ${p.max}`,
        pattern: () => 'Formato non valido',
        underage: () => 'Devi avere almeno 16 anni',
        passwordMismatch: () => 'Le password non corrispondono'
    };

    getError(errors: ValidationErrors | null): string | null {
        if (!errors) return null;
        const key = Object.keys(errors)[0];
        const msgFn = this.messages[key];
        return msgFn ? msgFn(errors[key]) : 'Campo non valido';
    }

    passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
        const password = group.get('password');
        const confirmPassword = group.get('confirmPassword');

        if (password?.value !== confirmPassword?.value) {
            confirmPassword?.setErrors({ ...confirmPassword.errors, passwordMismatch: true });
            return { passwordMismatch: true };
        }

        // Rimuovi solo passwordMismatch, preserva altri eventuali errori
        if (confirmPassword?.errors) {
            const { passwordMismatch, ...rest } = confirmPassword.errors;
            confirmPassword.setErrors(Object.keys(rest).length ? rest : null);
        }

        return null;
    };
}
