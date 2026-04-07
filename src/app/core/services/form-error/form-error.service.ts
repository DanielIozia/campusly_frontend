import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

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
    };

    getError(errors: ValidationErrors | null): string | null {
        if (!errors) return null;
        const key = Object.keys(errors)[0];
        const msgFn = this.messages[key];
        return msgFn ? msgFn(errors[key]) : 'Campo non valido';
    }
}
