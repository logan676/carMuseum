import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly exact?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly exactMatch = { exact: true };
  readonly defaultMatch = { exact: false };

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', path: '/', exact: true },
    { label: 'News', path: '/news' },
    { label: 'Encyclopedia', path: '/encyclopedia' },
    { label: 'My Garage', path: '/garage' },
    { label: 'Dealerships', path: '/dealerships' },
    { label: 'Settings', path: '/settings' },
  ];

  readonly externalLinks = [
    { label: 'API summary', href: 'http://localhost:4000/api/summary' },
  ];
}
