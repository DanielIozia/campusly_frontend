import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/events/events.component').then(
        (m) => m.EventsComponent
      ),
  },
];
