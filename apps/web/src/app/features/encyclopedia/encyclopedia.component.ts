import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  brands,
  encyclopediaModels,
  restorationProjects,
  timelineEntries,
} from '@autoverse/shared';

@Component({
  selector: 'app-encyclopedia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './encyclopedia.component.html',
  styleUrl: './encyclopedia.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EncyclopediaComponent {
  readonly timelineEntries = timelineEntries;
  readonly restorationProjects = restorationProjects;
  readonly models = encyclopediaModels;
  readonly brands = brands;
}
