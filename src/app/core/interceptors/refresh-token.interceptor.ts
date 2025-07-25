import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { environment } from '@environments/environment';

// Shared variables between interceptor calls
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const refreshTokenInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  // Skip refresh token logic for authentication endpoints
  if (request.url.includes(`${environment.apiUrl}/login`) ||
      request.url.includes(`${environment.apiUrl}/refresh-token`)) {
    return next(request);
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handle401Error(request, next, authService);
      }

      return throwError(() => error);
    })
  );
};

function handle401Error(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<unknown>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap(token => {
        isRefreshing = false;
        refreshTokenSubject.next(token);

        return next(addToken(request, token));
      }),
      catchError(error => {
        isRefreshing = false;
        authService.logout();
        return throwError(() => error);
      }),
      finalize(() => {
        isRefreshing = false;
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => {
        return next(addToken(request, token!));
      })
    );
  }
}

function addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
