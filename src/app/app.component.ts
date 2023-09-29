import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  standalone: true,
  imports: [RouterModule, MenubarModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: MenuItem[] = [
    {
      label: 'Vessels'
    },
    {
      label: 'Emissions '
    }
  ];
}
