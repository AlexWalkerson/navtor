import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom, of } from 'rxjs';

import * as EmissionsActions from '../state/emissions/emissions.actions';
import { EmissionsEffects } from '../state/emissions/emissions.effects';
import { EmissionsState } from '../state/emissions/emissions.reducer';
import { createEmissionsEntity } from '../state/emissions/mockEmissions';
import { FEATURE_NAME, reducers } from '../state/reducers';
import { EmissionsApiService } from './emissions-api.service';
import { EmissionsFacade } from './emissions.facade';

interface TestSchema {
  vessel: EmissionsState;
}

describe('VesselFacade', () => {
  let facade: EmissionsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(FEATURE_NAME, reducers),
          EffectsModule.forFeature([EmissionsEffects])
        ],
        providers: [
          EmissionsFacade,
          {
            provide: EmissionsApiService,
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
      facade = TestBed.inject(EmissionsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('load() should return empty list with loaded == true', async () => {
      let list = await firstValueFrom(facade.allEmissions$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.load();

      list = await firstValueFrom(facade.allEmissions$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadVesselSuccess` to manually update list
     */
    it('allEmissions$ should return the loaded list; and loaded flag == true', async () => {
      let list = await firstValueFrom(facade.allEmissions$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        EmissionsActions.loadEmissionsSuccess({
          emissions: [createEmissionsEntity(1), createEmissionsEntity(2)]
        })
      );

      list = await firstValueFrom(facade.allEmissions$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
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
  });
});
