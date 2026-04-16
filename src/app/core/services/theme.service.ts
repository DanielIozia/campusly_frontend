import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'campusly-theme';

  private themeSubject: BehaviorSubject<Theme>;
  currentTheme$;

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
    const preferred: Theme = saved ?? (this.prefersDark() ? 'dark' : 'light');
    this.themeSubject = new BehaviorSubject<Theme>(preferred);
    this.currentTheme$ = this.themeSubject.asObservable();
  }

  get current(): Theme {
    return this.themeSubject.value;
  }

  toggle(): void {
    this.setTheme(this.current === 'light' ? 'dark' : 'light');
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  private prefersDark(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
