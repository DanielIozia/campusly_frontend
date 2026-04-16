import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, signal, computed } from '@angular/core';
import { SpottedPost } from '../../../../core/models/spotted.models';
import { environment } from '../../../../../environments/environment';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-post',
  imports: [
    MatIcon,
    CommonModule, 
    FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  
  @Input() post: SpottedPost | null = null;

  private baseApiUrl = environment.apiUrl;
  isLiked = signal(false);
  isSaved = signal(false);
  currentIndex = 0;
  commentText = '';

  get isTextOnly(): boolean {
    return !this.post?.images?.length;
  }

  get trackStyle(): { width: string; transform: string } {
    const n = this.displayImages.length || 1;
    return {
      width: `${n * 100}%`,
      transform: `translateX(-${(this.currentIndex / n) * 100}%)`
    };
  }

  get slideWidth(): string {
    const n = this.displayImages.length || 1;
    return `${100 / n}%`;
  }

  get displayImages(): string[] {
    console.log( [...this.post?.images ?? []]
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(i => `${this.baseApiUrl}${i.url}`));
    if (!this.post?.images?.length) return [];
    
    return [...this.post.images]
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(i => `${this.baseApiUrl}${i.url}`);
  }

  get authorLabel(): string {
    return this.post?.isAnonymous ? 'Anonimo' : 'Utente';
  }

  get categoryLabel(): string {
    return this.post?.category ?? '';
  }

  //! creare pipe per questo
  get timeAgo(): string {
    if (!this.post?.createdAt) return '';
    const now = new Date();
    const then = new Date(this.post.createdAt);
    const diffMs = now.getTime() - then.getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'ora';
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}g`;
    return then.toLocaleDateString('it-IT');
  }

  toggleLike(): void {
    if (!this.post) return;
    this.isLiked.update(v => !v);
    if (this.isLiked()) {
      this.post.likeCount++;
    } else {
      this.post.likeCount--;
    }
  }

  toggleSave(): void {
    this.isSaved.update(v => !v);
  }

  nextImage(event: Event): void {
    event.stopPropagation();
    if (this.currentIndex < this.displayImages.length - 1) {
      this.currentIndex++;
    }
  }

  prevImage(event: Event): void {
    event.stopPropagation();
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToImage(index: number): void {
    this.currentIndex = index;
  }
}
