import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of, ReplaySubject, take } from 'rxjs';
import { EmissionsApiService } from '../services/emissions-api.service';

import * as EmissionsActions from './emissions.actions';
import { EmissionsEffects } from './emissions.effects';
import { createEmissionsEntity } from './mockEmissions';

describe('EmissionsEffects', () => {
  let action$: ReplaySubject<Action>;
  let effect: EmissionsEffects;
  let emissionsService: EmissionsApiService;
  const mockEmissions = [createEmissionsEntity(11), createEmissionsEntity(22)];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EmissionsEffects,
        provideMockActions(() => action$),
        provideMockStore(),
        {
          provide: EmissionsApiService,
          useValue: {
            fetch: jest.fn(() => of(mockEmissions))
          }
        }
      ]
    });

    effect = TestBed.inject(EmissionsEffects);
    emissionsService = TestBed.inject(EmissionsApiService);
    action$ = new ReplaySubject();
  });

  it('should be created', () => {
    expect(effect).toBeTruthy();
  });

  it('should get emissions', async () => {
    action$.next(EmissionsActions.loadEmissions());

    const result = await new Promise((resolve) => effect.load$.pipe(take(1)).subscribe(resolve));

    expect(emissionsService.fetch).toHaveBeenCalledWith();
    expect(result).toEqual(
      EmissionsActions.loadEmissionsSuccess({
        emissions: mockEmissions
      })
    );
  });

  it('should throw an error', async () => {
    const error = new Error('Mamma Mia!');
    jest.spyOn(emissionsService, 'fetch').mockImplementationOnce(() => {
      throw error;
    });

    action$.next(EmissionsActions.loadEmissions());
    const result = await new Promise((resolve) => effect.load$.pipe(take(1)).subscribe(resolve));

    expect(emissionsService.fetch).toHaveBeenCalledWith();
    expect(result).toEqual(
      EmissionsActions.loadEmissionsFailure({
        error: error
      })
    );
  });

});
