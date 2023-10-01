import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of, ReplaySubject, take } from 'rxjs';
import { VesselApiService } from '../../services/vessel-api.service';
import { createVesselEntity } from './mockVessel';

import * as VesselActions from './vessel.actions';
import { VesselEffects } from './vessel.effects';

describe('VesselEffects', () => {
  let effect: VesselEffects;
  let action$: ReplaySubject<Action>;
  let vesselService: VesselApiService;
  const mockVessels = [createVesselEntity(1, 'a'), createVesselEntity(2, 'b')];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VesselEffects,
        provideMockActions(() => action$),
        provideMockStore({
          initialState: {
            ids: [],
            entities: {},
            loading: false,
            loaded: false
          }}),
        {
          provide: VesselApiService,
          useValue: {
            fetch: jest.fn(() => of(mockVessels))
          }
        }
      ],
    });

    effect = TestBed.inject(VesselEffects);
    vesselService = TestBed.inject(VesselApiService);
    action$ = new ReplaySubject();
  });

  it('should be created', () => {
    expect(effect).toBeTruthy();
  });

  it('should get vessels', async () => {
    action$.next(VesselActions.loadVessel());

    const result = await new Promise((resolve) => effect.load$.pipe(take(1)).subscribe(resolve));

    expect(vesselService.fetch).toHaveBeenCalledWith();
    expect(result).toEqual(
      VesselActions.loadVesselSuccess({
        vessels: mockVessels
      })
    );
  });

});
