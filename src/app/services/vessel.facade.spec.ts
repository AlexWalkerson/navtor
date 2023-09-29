import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import * as VesselActions from '../state/vessel/vessel.actions';
import { VesselEffects } from '../state/vessel/vessel.effects';
import { VesselFacade } from '../services/vessel.facade';
import { Vessel } from '../models/vessel.models';
import { VESSEL_FEATURE_KEY, vesselReducer, VesselState } from '../state/vessel/vessel.reducer';

interface TestSchema {
  vessel: VesselState;
}

describe('VesselFacade', () => {
  let facade: VesselFacade;
  let store: Store<TestSchema>;
  const createVesselEntity = (id: number, name: string): Vessel => ({
    'id': id,
    'name': name,
    'mmsi': 999999901,
    'imo': 1023401,
    'companyId': 2301,
    'companyName': 'Alpha Company',
    'startDate': '1998-01-01T00:00:00Z',
    'active': true,
    'vesselType': 'Dry Cargo'
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(VESSEL_FEATURE_KEY, vesselReducer),
          EffectsModule.forFeature([VesselEffects]),
        ],
        providers: [VesselFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(VesselFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await firstValueFrom(facade.allVessel$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.load();

      list = await firstValueFrom(facade.allVessel$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadVesselSuccess` to manually update list
     */
    it('allVessel$ should return the loaded list; and loaded flag == true', async () => {
      let list = await firstValueFrom(facade.allVessel$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        VesselActions.loadVesselSuccess({
          vessels: [createVesselEntity(1, 'AAA'), createVesselEntity(2, 'BBB')],
        })
      );

      list = await firstValueFrom(facade.allVessel$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
