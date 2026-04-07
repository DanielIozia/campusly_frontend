import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const token = localStorage.getItem('accessToken');

    if (token) {
        req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
    }

    return next(req).pipe(
        catchError(error => {
            if (error.status === 401) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                router.navigate(['/auth/login']);
            }
            return throwError(() => error);
        })
    );
};