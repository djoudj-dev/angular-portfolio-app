import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // Sample data for the dashboard
  stats = [
    { title: 'Total Visitors', value: '1,234', icon: 'users', change: '+12%' },
    { title: 'Page Views', value: '5,678', icon: 'eye', change: '+8%' },
    { title: 'Conversion Rate', value: '3.2%', icon: 'chart-bar', change: '+2%' },
    { title: 'Avg. Session', value: '2m 45s', icon: 'clock', change: '-5%' },
  ];

  recentActivities = [
    { action: 'Portfolio updated', time: '2 hours ago' },
    { action: 'New project added', time: '1 day ago' },
    { action: 'Contact form submission', time: '3 days ago' },
    { action: 'Skills section updated', time: '1 week ago' },
  ];

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  async logout() {
    try {
      await this.authService.signOut();
      await this.router.navigate(['/admin/login']);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}
