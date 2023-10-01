import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, take } from 'rxjs';

import * as VesselActions from '../state/vessel/vessel.actions';
import * as VesselSelectors from '../state/vessel/vessel.selectors';

@Injectable()
export class VesselFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(VesselSelectors.selectVesselLoaded));
  allVessel$ = this.store.pipe(select(VesselSelectors.selectAllVessel));
  selectedVessel$ = this.store.pipe(select(VesselSelectors.selectEntity));

  /**
   * Initialization of loading vessels
   */
  load() {
    this.store.dispatch(VesselActions.loadVessel());
  }

  loadOnce() {
    this.loaded$.pipe(
      take(1),
      filter(loaded => !loaded),
    ).subscribe(() => this.load());
  }
}
