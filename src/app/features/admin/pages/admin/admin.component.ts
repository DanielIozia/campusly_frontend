import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  stats: any = null;

  reports: any[] = [];

  activities: any[] = [];

  approveReport(id: number): void {
    this.reports = this.reports.filter(r => r.id !== id);
  }

  removeReport(id: number): void {
    this.reports = this.reports.filter(r => r.id !== id);
  }

  banUser(id: number): void {
    this.reports = this.reports.filter(r => r.id !== id);
  }
}
