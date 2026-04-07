import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'oauth2/callback',
    loadComponent: () =>
      import('./features/auth/pages/oauth-callback/oauth-callback.component').then((m) => m.OauthCallbackComponent),
  },
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'feed',
        pathMatch: 'full',
        loadChildren: () =>
          import('./features/feed/feed.routes').then((m) => m.FEED_ROUTES),
      },

      {
        path: 'create',
        loadChildren: () =>
          import('./features/creation/creation.routes').then(
            (m) => m.creationRoutes
          ),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./features/chat/chat.routes').then((m) => m.chatRoutes),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./features/events/events.routes').then(
            (m) => m.eventsRoutes
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.routes').then(
            (m) => m.profileRoutes
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./features/admin/admin.routes').then((m) => m.adminRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'feed',
  },
];
