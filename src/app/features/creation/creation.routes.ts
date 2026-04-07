import { Routes } from '@angular/router';

export const creationRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/create-spotted/create-spotted.component').then(
        (m) => m.CreateSpottedComponent
      ),
  },
];
