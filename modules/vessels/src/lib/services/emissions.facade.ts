import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, take } from 'rxjs';

import * as EmissionsActions from '../state/emissions/emissions.actions';
import * as EmissionsSelectors from '../state/emissions/emissions.selectors';

@Injectable()
export class EmissionsFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(EmissionsSelectors.selectEmissionsLoaded));
  allEmissions$ = this.store.pipe(select(EmissionsSelectors.selectAllEmissions));
  selectedEmission$ = this.store.pipe(select(EmissionsSelectors.selectEntity));

  /**
   * Initialization of loading vessels
   */
  load() {
    this.store.dispatch(EmissionsActions.loadEmissions());
  }

  loadOnce() {
    this.loaded$.pipe(
      take(1),
      filter(loaded => !loaded),
    ).subscribe(() => this.load());
  }
}
