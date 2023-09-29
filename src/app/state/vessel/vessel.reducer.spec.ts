import { Action } from '@ngrx/store';

import * as VesselActions from './vessel.actions';
import { VesselEntity } from './vessel.models';
import {
  VesselState,
  initialVesselState,
  vesselReducer,
} from './vessel.reducer';

describe('Vessel Reducer', () => {
  const createVesselEntity = (id: number, name: string): VesselEntity => ({
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

  describe('valid Vessel actions', () => {
    it('loadVesselSuccess should return the list of known Vessel', () => {
      const vessel = [
        createVesselEntity(1, 'PRODUCT-AAA'),
        createVesselEntity(2, 'PRODUCT-zzz'),
      ];
      const action = VesselActions.loadVesselSuccess({ vessel });

      const result: VesselState = vesselReducer(initialVesselState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
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
