import { Component, OnInit, OnDestroy, Renderer2, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { ThemeService } from './core/services/theme.service';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [
    ToastComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private auth = inject(AuthService);
  private themeService = inject(ThemeService);
  private renderer = inject(Renderer2);

  private themeSub?: Subscription;

  ngOnInit(): void {
    // Apply theme class immediately from persisted preference
    this.applyTheme(this.themeService.current);

    // React to future theme changes
    this.themeSub = this.themeService.currentTheme$.subscribe(theme => {
      this.applyTheme(theme);
    });
  }

  ngOnDestroy(): void {
    this.themeSub?.unsubscribe();
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    const body = document.body;
    if (theme === 'dark') {
      this.renderer.addClass(body, 'dark-theme');
      this.renderer.removeClass(body, 'light-theme');
    } else {
      this.renderer.addClass(body, 'light-theme');
      this.renderer.removeClass(body, 'dark-theme');
    }
  }
}
