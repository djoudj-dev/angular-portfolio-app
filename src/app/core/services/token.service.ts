import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from './auth.service';

// Extend User interface to include JWT specific properties
export interface DecodedToken extends User {
  exp: number; // Expiration time
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  private readonly platformId = inject(PLATFORM_ID);

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getAccessToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }
    return null;
  }

  setAccessToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    }
  }

  setRefreshToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
    }
  }

  setTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  clearTokens(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
  }

  // Basic JWT token parsing without @auth0/angular-jwt
  decodeToken(token: string): DecodedToken | null {
    if (!token) return null;

    try {
      if (!this.isBrowser()) {
        return {
          id: 'server-side-user',
          email: 'server@example.com',
          roles: ['USER'],
          exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
        };
      }

      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload) as DecodedToken;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    if (!token) return true;

    if (!this.isBrowser()) {
      return false;
    }

    const decoded: DecodedToken | null = this.decodeToken(token);
    if (!decoded?.exp) return true;

    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decoded.exp);

    return expirationDate.valueOf() <= new Date().valueOf();
  }

  getTokenExpirationDate(token: string): Date | null {
    if (!this.isBrowser() || !token) {
      return null;
    }

    const decoded: DecodedToken | null = this.decodeToken(token);
    if (!decoded?.exp) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
}
