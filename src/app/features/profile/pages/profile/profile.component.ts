import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: any = null;

  activeTab: 'host' | 'home' = 'host';

  posts: any[] = [];

  switchTab(tab: 'host' | 'home'): void {
    this.activeTab = tab;
  }
}
