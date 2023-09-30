import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as EmissionActions from './emission.actions';
import { EmissionEffects } from './emission.effects';

describe('EmissionEffects', () => {
  let actions: Observable<Action>;
  let effects: EmissionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        EmissionEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(EmissionEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: EmissionActions.initEmission() });

      const expected = hot('-a-|', {
        a: EmissionActions.loadEmissionSuccess({ emission: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
