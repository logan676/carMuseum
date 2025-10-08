import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dealerships } from '@autoverse/shared';

@Component({
  selector: 'app-dealerships',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dealerships.component.html',
  styleUrl: './dealerships.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealershipsComponent {
  readonly dealerships = dealerships;
}
