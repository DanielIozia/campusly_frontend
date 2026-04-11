import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component';
import { RegistrationService } from '../../../../core/services/registration.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  loading = false;

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
    private service: RegistrationService,
    private router: Router
  ) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      birthDay: ['', [Validators.required]],
      birthMonth: ['', [Validators.required]],
      birthYear: ['', [Validators.required, this.minAgeValidator(16)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: [''],
    });
  }

  onSubmit(): void {
    // console.log("prima");
    // console.log(this.registerForm.value);
    // if (!this.registerForm.valid) return;
    // console.log("dopo");
    // this.loading = true;
    // this.errorMessage = null;

    // const form = this.registerForm.value;
    // const payload: RegisterRequest = {
    //   firstName: form.firstName,
    //   lastName: form.lastName,
    //   username: form.username,
    //   birthDate: {
    //     day: Number(form.birthDay),
    //     month: Number(form.birthMonth),
    //     year: Number(form.birthYear),
    //   },
    //   email: form.email,
    //   password: form.password,
    //   phone: form.phone || undefined,
    // };

    // this.service.(payload).subscribe({
    //   next: () => {
    //     this.router.navigate(['/feed']);
    //   },
    //   error: (err: HttpErrorResponse) => {
    //     this.loading = false;
    //     const apiError = err.error as ApiResponse<null>;
    //     this.errorMessage = apiError?.error?.message || apiError?.warning?.message || 'Errore durante la registrazione';
    //   }
    // });
  }

  private minAgeValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const currentYear = new Date().getFullYear();
      const age = currentYear - Number(control.value);
      return age < minAge ? { underage: true } : null;
    };
  }
}
