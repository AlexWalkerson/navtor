import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as VesselActions from './vessel.actions';
import * as VesselSelectors from './vessel.selectors';

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
}
