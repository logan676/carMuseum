import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SettingsSection {
  readonly title: string;
  readonly items: ReadonlyArray<{ title: string; subtitle: string; icon: string }>;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  readonly sections: SettingsSection[] = [
    {
      title: 'Account',
      items: [
        { title: 'Profile', subtitle: 'Edit your profile information', icon: 'person-circle-outline' },
        { title: 'Subscription', subtitle: 'Manage your subscription', icon: 'star-outline' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { title: 'Notifications', subtitle: 'Customize your notifications', icon: 'notifications-outline' },
        { title: 'App Configuration', subtitle: 'Adjust app settings', icon: 'options-outline' },
      ],
    },
    {
      title: 'Support',
      items: [
        { title: 'Help Center', subtitle: 'Get help and support', icon: 'help-circle-outline' },
        { title: 'Contact Us', subtitle: 'Reach out for assistance', icon: 'mail-outline' },
      ],
    },
  ];
}
