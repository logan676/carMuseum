import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    title: 'Dashboard • AutoVerse',
  },
  {
    path: 'news',
    loadComponent: () => import('./features/news/news.component').then((m) => m.NewsComponent),
    title: 'News • AutoVerse',
  },
  {
    path: 'encyclopedia',
    loadComponent: () =>
      import('./features/encyclopedia/encyclopedia.component').then((m) => m.EncyclopediaComponent),
    title: 'Encyclopedia • AutoVerse',
  },
  {
    path: 'garage',
    loadComponent: () => import('./features/garage/garage.component').then((m) => m.GarageComponent),
    title: 'My Garage • AutoVerse',
  },
  {
    path: 'dealerships',
    loadComponent: () =>
      import('./features/dealerships/dealerships.component').then((m) => m.DealershipsComponent),
    title: 'Dealerships • AutoVerse',
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/settings.component').then((m) => m.SettingsComponent),
    title: 'Settings • AutoVerse',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
