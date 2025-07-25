import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly authService = inject(AuthService);

  @Input() set appHasRole(roles: string | string[]) {
    this.roles = Array.isArray(roles) ? roles : [roles];
    this.updateView();
  }

  private roles: string[] = [];
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateView();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  private updateView(): void {
    this.viewContainer.clear();

    if (this.checkRoles()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private checkRoles(): boolean {
    if (!this.roles || this.roles.length === 0) {
      return true;
    }

    return this.roles.some(role => this.authService.hasRole(role));
  }
}
