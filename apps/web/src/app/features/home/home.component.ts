import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { brands } from '@autoverse/shared';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly brands = brands;

  readonly banners: { src: string; alt: string }[] = [
    {
      src: '/images/car-mezuem-banner-1.svg',
      alt: 'Car Mezuem kinetic light tunnel installation',
    },
    {
      src: '/images/car-mezuem-banner-2.svg',
      alt: 'Car Mezuem night showcase silhouettes',
    },
    {
      src: '/images/car-mezuem-banner-3.svg',
      alt: 'Car Mezuem gallery geometry backdrop',
    },
  ];
}
