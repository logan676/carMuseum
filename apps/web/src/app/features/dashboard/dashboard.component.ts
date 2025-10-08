import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  featuredModels,
  newsArticles,
  quickLinks,
  type NewsArticle,
  type QuickLink,
} from '@autoverse/shared';

const routeMap: Record<string, string> = {
  Dashboard: '/',
  News: '/news',
  Encyclopedia: '/encyclopedia',
  MyGarage: '/garage',
  FindDealerships: '/dealerships',
  Settings: '/settings',
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly router = inject(Router);

  readonly heroArticle: NewsArticle | undefined = newsArticles.at(0);
  readonly featuredModels = featuredModels;
  readonly quickLinks = quickLinks;
  readonly latestArticles = newsArticles.slice(1, 4);

  onSeeAll(): void {
    this.router.navigateByUrl('/news');
  }

  onQuickLink(link: QuickLink): void {
    const path = routeMap[link.route] ?? '/';
    this.router.navigateByUrl(path);
  }
}
