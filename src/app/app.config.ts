import { ApplicationConfig, provideZoneChangeDetection, isDevMode, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { credentialsInterceptor } from './core/interceptors/credentials.interceptor';
import { authInterceptor } from './core/interceptors/authInterceptor';
import { provideServiceWorker } from '@angular/service-worker';
import { AuthService } from './core/services/auth.service';
import { catchError, firstValueFrom, of } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([credentialsInterceptor, authInterceptor])
    ),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return firstValueFrom(authService.me().pipe(catchError(() => of(null))));
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
