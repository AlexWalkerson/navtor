import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'lib-navigation',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
    items: MenuItem[] = [
    {
      label: 'Vessels',
      routerLink: 'vessels'
    },
    {
      label: 'Emissions',
      routerLink: 'emissions'
    }
  ];
}
