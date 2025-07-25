import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';

export interface User {
  id: string;
  email: string;
  roles: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface AuthSession {
  user: User | null;
}

export type AuthChangeEvent = 'SIGNED_IN' | 'SIGNED_OUT';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Initialize authentication state at startup
    this.checkAuthStatus();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private checkAuthStatus(): void {
    // Skip token check in server-side rendering
    if (!this.isBrowser()) {
      return;
    }

    const token = this.tokenService.getAccessToken();
    if (token && !this.tokenService.isTokenExpired(token)) {
      try {
        const user = this.tokenService.decodeToken(token);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        this.logout();
      }
    }
  }

  get session(): AuthSession {
    return { user: this.currentUserSubject.value };
  }

  getSession(): Promise<{ data: { session: AuthSession | null } }> {
    return Promise.resolve({
      data: {
        session: this.currentUserSubject.value ? { user: this.currentUserSubject.value } : null
      }
    });
  }

  login(credentials: LoginRequest): Observable<User> {
    // For demo purposes, we'll simulate a successful login
    // In a real app, this would make an API call to authenticate
    return of({
      user: {
        id: 'user-' + Date.now(),
        email: credentials.email,
        roles: ['USER', 'ADMIN']
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItMTIzIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiVVNFUiIsIkFETUlOIl0sImV4cCI6MTcxNjkyMzYwMH0.dummySignature',
      refreshToken: 'refresh-token-dummy'
    }).pipe(
      tap((response: AuthResponse) => {
        // Only set tokens in browser environment
        if (this.isBrowser()) {
          this.tokenService.setTokens(response.token, response.refreshToken);
        }
        this.currentUserSubject.next(response.user);
        this.isAuthenticatedSubject.next(true);
      }),
      map(response => response.user),
      catchError(error => {
        console.error('Login error', error);
        return throwError(() => new Error('Invalid credentials'));
      })
    );
  }

  // For backward compatibility with existing code
  async signIn(email: string, password: string = 'password'): Promise<{ error: Error | null }> {
    try {
      await firstValueFrom(this.login({ email, password }));
      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error(String(error)) };
    }
  }

  refreshToken(): Observable<string> {
    // Skip refresh token in server-side rendering
    if (!this.isBrowser()) {
      return of('server-side-token');
    }

    const refreshToken = this.tokenService.getRefreshToken();

    if (!refreshToken) {
      return throwError(() => new Error('Refresh token not available'));
    }

    // For demo purposes, we'll simulate a successful token refresh
    // In a real app, this would make an API call to refresh the token
    return of({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItMTIzIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiVVNFUiIsIkFETUlOIl0sImV4cCI6MTcxNjkyMzYwMH0.newSignature',
    }).pipe(
      tap(response => {
        this.tokenService.setAccessToken(response.token);
      }),
      map(response => response.token),
      catchError(error => {
        console.error('Error refreshing token', error);
        this.logout();
        return throwError(() => new Error('Failed to refresh token'));
      })
    );
  }

  logout(): void {
    // Only clear tokens in browser environment
    if (this.isBrowser()) {
      this.tokenService.clearTokens();
    }
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/admin/login']);
  }

  // For backward compatibility with existing code
  signOut(): Promise<void> {
    this.logout();
    return Promise.resolve();
  }

  authChanges(callback: (event: AuthChangeEvent, session: AuthSession | null) => void) {
    const subscription = this.currentUser$.subscribe(user => {
      const event: AuthChangeEvent = user ? 'SIGNED_IN' : 'SIGNED_OUT';
      callback(event, { user });
    });

    return {
      data: { subscription },
      error: null
    };
  }

  hasRole(role: string): boolean {
    // In server environment, allow access for initial rendering
    if (!this.isBrowser()) {
      return true;
    }

    const user = this.currentUserSubject.value;
    return user?.roles?.includes(role) || false;
  }
}
