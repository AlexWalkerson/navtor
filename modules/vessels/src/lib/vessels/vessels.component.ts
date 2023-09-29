import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'lib-vessels',
  standalone: true,
  imports: [CommonModule, PanelModule],
  templateUrl: './vessels.component.html',
  styleUrls: ['./vessels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VesselsComponent {
  header = 'Vessels';
}
