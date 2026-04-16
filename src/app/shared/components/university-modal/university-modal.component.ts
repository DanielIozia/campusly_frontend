import { Component, EventEmitter, OnInit, Output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UniversityService } from '../../../core/services/university.service';
import * as University_Models from '../../../core/models/university.models';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-university-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './university-modal.component.html',
    styleUrls: ['./university-modal.component.scss']
})
export class UniversityModalComponent implements OnInit {
    @Output() universitySelected = new EventEmitter<string>();
    @Output() skipped = new EventEmitter<void>();

    universities = signal<University_Models.University[]>([]);
    searchQuery = signal('');
    selectedUniversity = signal<University_Models.University | null>(null);
    loading = signal(false);

    filteredUniversities = computed(() => {
        const q = this.searchQuery().toLowerCase().trim();
        if (!q) return this.universities();
        return this.universities().filter(u =>
            u.name.toLowerCase().includes(q) ||
            u.shortName.toLowerCase().includes(q) ||
            u.city.toLowerCase().includes(q)
        );
    });

    constructor(private universityService: UniversityService) {}

    ngOnInit(): void {
        this.loading.set(true);
        this.universityService.getUniversities()
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (res) => {
                    if (res.data) this.universities.set(res.data);
                }
            });
    }

    onSearchChange(value: string): void {
        this.searchQuery.set(value);
    }

    selectUniversity(university: University_Models.University): void {
        this.selectedUniversity.set(university);
    }

    onConfirm(): void {
        const selected = this.selectedUniversity();
        if (!selected) return;
        this.universitySelected.emit(selected.id);
    }

    onSkip(): void {
        this.skipped.emit();
    }
}
