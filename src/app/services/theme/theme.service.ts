import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'uiuc-mcs-theme';
  isDarkMode = signal<boolean>(false);

  constructor() {
    // Load saved theme preference or use system preference
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme !== null) {
      this.isDarkMode.set(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
    }
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode.update(dark => !dark);
    this.applyTheme();
  }

  private applyTheme(): void {
    const theme = this.isDarkMode() ? 'dark' : 'light';
    localStorage.setItem(this.THEME_KEY, theme);
    
    // Apply theme class to body
    if (this.isDarkMode()) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
