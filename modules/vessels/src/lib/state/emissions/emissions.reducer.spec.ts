import { Action } from '@ngrx/store';

import * as EmissionsActions from './emissions.actions';
import { emissionsReducer, EmissionsState, initialEmissionsState } from './emissions.reducer';
import { createEmissionsEntity } from './mockEmissions';

describe('Emissions Reducer', () => {


  describe('valid Emission actions', () => {
    it('loadEmissions', () => {
      const action = EmissionsActions.loadEmissions();
      const result: EmissionsState = emissionsReducer(initialEmissionsState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
    });

    it('loadEmissionSuccess should return the list of known Emission', () => {
      const emissions = [
        createEmissionsEntity(11),
        createEmissionsEntity(22),
      ];
      const action = EmissionsActions.loadEmissionsSuccess({ emissions });
      const result: EmissionsState = emissionsReducer(initialEmissionsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });

    it('loadEmissionsFailure should log an error', () => {
      const error = new Error('woops');
      const action = EmissionsActions.loadEmissionsFailure({ error });
      const result = emissionsReducer(initialEmissionsState, action);

      expect(result.error).toBeTruthy();
      expect(result.error?.message).toEqual('woops');
      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);

    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = emissionsReducer(initialEmissionsState, action);

      expect(result).toBe(initialEmissionsState);
    });
  });
});
