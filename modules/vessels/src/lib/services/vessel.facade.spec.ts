import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom, of } from 'rxjs';
import { Vessel } from '../models/vessel.models';
import { FEATURE_NAME, reducers } from '../state/reducers';

import * as VesselActions from '../state/vessel/vessel.actions';
import { VesselEffects } from '../state/vessel/vessel.effects';
import { VesselState } from '../state/vessel/vessel.reducer';
import { VesselApiService } from './vessel-api.service';
import { VesselFacade } from './vessel.facade';

interface TestSchema {
  vessel: VesselState;
}

describe('VesselFacade', () => {
  let facade: VesselFacade;
  let store: Store<TestSchema>;
  const createVesselEntity = (id: number, name: string): Vessel => ( {
    'id': id,
    'name': name,
    'mmsi': 999999901,
    'imo': 1023401,
    'companyId': 2301,
    'companyName': 'Alpha Company',
    'startDate': '1998-01-01T00:00:00Z',
    'active': true,
    'vesselType': 'Dry Cargo'
  } );

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(FEATURE_NAME, reducers),
          EffectsModule.forFeature([VesselEffects])
        ],
        providers: [
          VesselFacade,
          {
            provide: VesselApiService,
            useValue: {
              fetch: jest.fn(() => of([]))
            }
          }
        ]
      })
      class CustomFeatureModule {
      }

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
          HttpClientTestingModule
        ]
      })
      class RootModule {
      }

      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(VesselFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('load() should return empty list with loaded == true', async () => {
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
          vessels: [createVesselEntity(1, 'AAA'), createVesselEntity(2, 'BBB')]
        })
      );

      list = await firstValueFrom(facade.allVessel$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });

    it('loadOnce() should load data once', async () => {
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(isLoaded).toBe(false);

      jest.spyOn(facade, 'load');
      facade.loadOnce();
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(isLoaded).toBe(true);
      expect(facade.load).toBeCalled();

      facade.loadOnce();

      expect(facade.load).toHaveBeenCalledTimes(1);
    });

    it('select() should select entity', async () => {
      let list = await firstValueFrom(facade.allVessel$);
      let selectedVessel = await firstValueFrom(facade.selectedVessel$);

      expect(list.length).toBe(0);
      expect(selectedVessel).toBeUndefined();

      const entities = [createVesselEntity(1, 'AAA'), createVesselEntity(2, 'BBB')];
      store.dispatch(VesselActions.loadVesselSuccess({ vessels: entities }));
      list = await firstValueFrom(facade.allVessel$);

      expect(list.length).toBe(2);

      store.dispatch(VesselActions.selectVessel({ id: 2 }));
      selectedVessel = await firstValueFrom(facade.selectedVessel$);

      expect(selectedVessel).toBe(entities[1]);
    });
  });
});
