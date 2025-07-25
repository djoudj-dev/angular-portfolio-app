import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const tokenService = inject(TokenService);

  // Don't add the token for authentication requests
  if (request.url.includes(`${environment.apiUrl}/login`) ||
      request.url.includes(`${environment.apiUrl}/refresh-token`)) {
    return next(request);
  }

  const token = tokenService.getAccessToken();

  if (token) {
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(request);
};
