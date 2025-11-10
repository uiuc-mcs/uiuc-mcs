import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => localStorageMock[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      localStorageMock[key] = value;
    });
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jasmine.createSpy('matchMedia').and.returnValue({
        matches: false,
        media: '(prefers-color-scheme: dark)',
        addEventListener: jasmine.createSpy('addEventListener'),
        removeEventListener: jasmine.createSpy('removeEventListener')
      })
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with light theme by default when no preference is saved', () => {
    expect(service.isDarkMode()).toBe(false);
  });

  it('should load saved theme preference from localStorage', () => {
    localStorageMock['uiuc-mcs-theme'] = 'dark';
    service = TestBed.inject(ThemeService);
    expect(service.isDarkMode()).toBe(true);
  });

  it('should toggle theme from light to dark', () => {
    service.isDarkMode.set(false);
    service.toggleTheme();
    expect(service.isDarkMode()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('uiuc-mcs-theme', 'dark');
  });

  it('should toggle theme from dark to light', () => {
    service.isDarkMode.set(true);
    service.toggleTheme();
    expect(service.isDarkMode()).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('uiuc-mcs-theme', 'light');
  });

  it('should add dark-theme class to body when dark mode is enabled', () => {
    service.isDarkMode.set(false);
    service.toggleTheme();
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });

  it('should remove dark-theme class from body when light mode is enabled', () => {
    document.body.classList.add('dark-theme');
    service.isDarkMode.set(true);
    service.toggleTheme();
    expect(document.body.classList.contains('dark-theme')).toBe(false);
  });

  it('should use system preference when no saved preference exists', () => {
    (window.matchMedia as jasmine.Spy).and.returnValue({
      matches: true,
      media: '(prefers-color-scheme: dark)',
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener')
    });
    service = TestBed.inject(ThemeService);
    expect(service.isDarkMode()).toBe(true);
  });
});
