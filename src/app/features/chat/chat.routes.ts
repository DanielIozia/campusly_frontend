import { Routes } from '@angular/router';

export const chatRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/chat/chat.component').then((m) => m.ChatComponent),
  },
];
