import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpottedService } from '../../../../core/services/spotted.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ToasterService } from '../../../../core/services/toaster.service';
import * as Spotted_Models from '../../../../core/models/spotted.models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-create-spotted',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-spotted.component.html',
  styleUrl: './create-spotted.component.scss'
})
export class CreateSpottedComponent {
  form: FormGroup;
  isAnonymous = true;
  maxChars = 1000;
  loading = signal(false);
  selectedImages: File[] = [];

  categories: { label: string; icon: string; active: boolean }[] = [
    { label: 'Amore', icon: 'favorite', active: false },
    { label: 'Biblioteca', icon: 'menu_book', active: false },
    { label: 'Mensa', icon: 'restaurant', active: false },
    { label: 'Lezione', icon: 'school', active: false },
    { label: 'Festa', icon: 'celebration', active: false },
    { label: 'Sport', icon: 'sports_soccer', active: false },
    { label: 'Altro', icon: 'more_horiz', active: false },
  ];

  constructor(
    private fb: FormBuilder,
    private spottedService: SpottedService,
    private authService: AuthService,
    private toasterService: ToasterService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(this.maxChars)]]
    });
  }

  get canCreate(): boolean {
    return this.authService.canCreatePost();
  }

  get charCount(): number {
    return this.form.get('content')?.value?.length || 0;
  }

  get activeCategory(): string | null {
    return this.categories.find(c => c.active)?.label ?? null;
  }

  selectCategory(index: number): void {
    this.categories.forEach((c, i) => c.active = i === index);
  }

  toggleAnonymous(): void {
    this.isAnonymous = !this.isAnonymous;
  }

  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedImages = Array.from(input.files);
    }
  }

  publish(): void {
    if (!this.canCreate) {
      this.toasterService.warning('Accesso limitato', 'Seleziona una università per pubblicare post.');
      return;
    }

    if (!this.form.valid) return;

    const category = this.activeCategory;
    if (!category) {
      this.toasterService.warning('Categoria mancante', 'Seleziona una categoria per il tuo spotted.');
      return;
    }

    this.loading.set(true);
    const request: Spotted_Models.CreateSpotted_Request = {
      content: this.form.value.content,
      category,
      isAnonymous: this.isAnonymous,
      images: this.selectedImages.length > 0 ? this.selectedImages : undefined,
    };

    this.spottedService.createSpotted(request)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.toasterService.success('Spotted pubblicato!', 'Il tuo post è ora visibile alla community.');
          this.router.navigate(['/feed']);
        },
        error: () => {}
      });
  }
}
