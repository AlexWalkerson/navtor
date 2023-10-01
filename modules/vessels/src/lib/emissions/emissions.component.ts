import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectEntity } from '../state/emissions/emissions.selectors';

@Component({
  selector: 'lib-emissions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emissions.component.html',
  styleUrls: ['./emissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmissionsComponent {
  private readonly store = inject(Store);
  emissions$ = this.store.pipe(select(selectEntity))




}
