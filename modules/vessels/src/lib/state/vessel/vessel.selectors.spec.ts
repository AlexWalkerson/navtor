import { Vessel } from '../../models/vessel.models';
import { FEATURE_NAME } from '../reducers';
import { createVesselEntity } from './mockVessel';
import { initialVesselState, VESSEL_FEATURE_KEY, vesselAdapter, VesselPartialState } from './vessel.reducer';
import * as VesselSelectors from './vessel.selectors';

describe('Vessel Selectors', () => {
  const ERROR = new Error('No Error Available');
  const getVesselId = (it: Vessel) => it.id;

  let state: {
    [FEATURE_NAME]: VesselPartialState
  };

  beforeEach(() => {
    state = {
      [FEATURE_NAME]: {
        [VESSEL_FEATURE_KEY]: vesselAdapter.setAll(
          [
            createVesselEntity(1, 'PRODUCT-AAA'),
            createVesselEntity(2, 'PRODUCT-BBB'),
            createVesselEntity(3, 'PRODUCT-CCC')
          ],
          {
            ...initialVesselState,
            selectedId: 2,
            error: ERROR,
            loaded: true,
            loading: false
          }
        )
      }
    };
  });

  describe('Vessel Selectors', () => {
    it('selectAllVessel() should return the list of Vessel', () => {
      const results = VesselSelectors.selectAllVessel(state);

      expect(results.length).toBe(3);
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = VesselSelectors.selectEntity(state) as Vessel;
      const selId = getVesselId(result);

      expect(selId).toBe(2);
    });

    it('selectVesselLoaded() should return the current "loaded" status', () => {
      const result = VesselSelectors.selectVesselLoaded(state);

      expect(result).toBe(true);
    });

    it('selectVesselError() should return the current "error" state', () => {
      const result = VesselSelectors.selectVesselError(state);

      expect(result).toBe(ERROR);
    });

    it('selectSelectedId() should return the selectedId', () => {
      const result = VesselSelectors.selectSelectedId(state);

      expect(result).toBe(2);
    });

  });
});
