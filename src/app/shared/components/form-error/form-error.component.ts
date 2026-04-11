import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormErrorService } from '../../../core/services/form-error.service';

@Component({
    selector: 'app-form-error',
    standalone: true,
    template: `
        @if (control?.invalid && control?.touched) {
            <span class="form-error">{{ errorMessage }}</span>
        }
    `,
    styles: [`
    .form-error {
        color: var(--error, #af2525);
        font-size: var(--body-sm, 0.75rem);
        display: block;
        padding: 8px 16px;
        border-radius: 9999px;
    }
`]
})
export class FormErrorComponent {
    @Input() control: AbstractControl | null = null;

    constructor(private formErrorService: FormErrorService) { }

    get errorMessage(): string | null {
        return this.formErrorService.getError(this.control?.errors ?? null);
    }
}
