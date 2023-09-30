import { Action } from '@ngrx/store';
import { createVesselEntity } from './mockVessel';
import * as VesselActions from './vessel.actions';
import {
  VesselState,
  initialVesselState,
  vesselReducer,
} from './vessel.reducer';

describe('Vessel Reducer', () => {

  describe('valid Vessel actions', () => {
    it('loadVesselSuccess should return the list of known Vessel', () => {
      const vessel = [
        createVesselEntity(1, 'PRODUCT-AAA'),
        createVesselEntity(2, 'PRODUCT-zzz'),
      ];
      const action = VesselActions.loadVesselSuccess({ vessels: vessel });

      const result: VesselState = vesselReducer(initialVesselState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });

    it('selectVessel should select a vessel', () => {
      const vessel = createVesselEntity(1, 'PRODUCT-AAA');
      const action = VesselActions.selectVessel({ vessel });
      const result = vesselReducer(initialVesselState, action);

      expect(result.selectedId).toEqual(vessel.id);
    });

    it('loadVesselFailure should log an error', () => {
      const error = new Error('woops');
      const action = VesselActions.loadVesselFailure({ error });
      const result = vesselReducer(initialVesselState, action);

      expect(result.error).toBeTruthy();
      expect(result.error?.message).toEqual('woops');
      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = vesselReducer(initialVesselState, action);

      expect(result).toBe(initialVesselState);
    });
  });
});
