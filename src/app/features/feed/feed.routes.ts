import { Routes } from '@angular/router';

export const FEED_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/feed/feed.component').then(m => m.FeedComponent)
  }
];
