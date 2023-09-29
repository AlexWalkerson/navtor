import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-emissions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emissions.component.html',
  styleUrls: ['./emissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmissionsComponent {}
