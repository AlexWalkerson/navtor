import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as VesselActions from './vessel.actions';
import { VesselEffects } from './vessel.effects';

describe('VesselEffects', () => {
  let actions: Observable<Action>;
  let effects: VesselEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        VesselEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(VesselEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: VesselActions.loadVessel() });

      const expected = hot('-a-|', {
        a: VesselActions.loadVesselSuccess({ vessels: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
