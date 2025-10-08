import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { newsArticles, newsCategories, type NewsArticle, type NewsCategory } from '@autoverse/shared';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent {
  private readonly allArticles = newsArticles;
  readonly categories = newsCategories;
  readonly selectedCategory = signal<NewsCategory>('All');

  readonly filteredArticles = computed<NewsArticle[]>(() => {
    const category = this.selectedCategory();
    if (category === 'All') {
      return this.allArticles;
    }
    return this.allArticles.filter((article) => article.category === category);
  });

  onCategoryChange(category: NewsCategory): void {
    this.selectedCategory.set(category);
  }
}
