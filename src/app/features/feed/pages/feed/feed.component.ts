import { Component } from '@angular/core';

@Component({
  selector: 'app-feed',
  standalone: true,
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  categories: { label: string; active: boolean }[] = [];

  stories: { name: string; img: string; hasStory: boolean }[] = [];

  posts: any[] = [];

  selectCategory(index: number): void {
    this.categories.forEach((c, i) => c.active = i === index);
  }
}
