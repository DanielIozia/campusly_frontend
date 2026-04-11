import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-oauth-callback',
  standalone: true,
  template: `
    <div class="oauth-callback">
      <span class="material-symbols-outlined oauth-callback__spinner">progress_activity</span>
      <p>Autenticazione in corso...</p>
    </div>
  `,
  styles: [`
    .oauth-callback {
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      color: var(--on-surface-variant);
    }
    .oauth-callback__spinner {
      font-size: 48px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class OauthCallbackComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //this.authService.handleOAuthCallback();
  }
}
