import { Component, ChangeDetectionStrategy, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { SpottedService } from '../../../../core/services/spotted.service';
import { AuthService } from '../../../../core/services/auth.service';
import { SpottedPost } from '../../../../core/models/spotted.models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit {

  posts = signal<SpottedPost[]>([]);
  loading = signal(false);

  constructor(
    private spottedService: SpottedService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.loading.set(true);
    const universityId = this.authService.user()?.data?.universityId ?? undefined;

    this.spottedService.listSpotted({ universityId })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          if (res.data) this.posts.set(res.data);
        },
        error: () => {}
      });
  }
}
