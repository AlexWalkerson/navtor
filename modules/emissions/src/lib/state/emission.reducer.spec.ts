import { Action } from '@ngrx/store';

import * as EmissionActions from './emission.actions';
import { EmissionEntity } from './emission.models';
import {
  EmissionState,
  initialEmissionState,
  emissionReducer,
} from './emission.reducer';

describe('Emission Reducer', () => {
  const createEmissionEntity = (id: string, name = ''): EmissionEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Emission actions', () => {
    it('loadEmissionSuccess should return the list of known Emission', () => {
      const emission = [
        createEmissionEntity('PRODUCT-AAA'),
        createEmissionEntity('PRODUCT-zzz'),
      ];
      const action = EmissionActions.loadEmissionSuccess({ emission });

      const result: EmissionState = emissionReducer(
        initialEmissionState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = emissionReducer(initialEmissionState, action);

      expect(result).toBe(initialEmissionState);
    });
  });
});
