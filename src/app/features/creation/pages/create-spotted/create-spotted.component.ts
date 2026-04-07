import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-spotted',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-spotted.component.html',
  styleUrl: './create-spotted.component.scss'
})
export class CreateSpottedComponent {
  form: FormGroup;
  isAnonymous = true;
  maxChars = 500;

  categories: { label: string; icon: string; active: boolean }[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(this.maxChars)]]
    });
  }

  get charCount(): number {
    return this.form.get('content')?.value?.length || 0;
  }

  selectCategory(index: number): void {
    this.categories.forEach((c, i) => c.active = i === index);
  }

  toggleAnonymous(): void {
    this.isAnonymous = !this.isAnonymous;
  }

  publish(): void {
    if (this.form.valid) {
      console.log('Publishing spotted:', {
        content: this.form.value.content,
        category: this.categories.find(c => c.active)?.label,
        anonymous: this.isAnonymous
      });
    }
  }
}
