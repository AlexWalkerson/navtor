import { Vessel } from '../../models/vessel.models';
import { createVesselEntity } from './mockVessel';
import { initialVesselState, vesselAdapter, VesselPartialState } from './vessel.reducer';
import * as VesselSelectors from './vessel.selectors';

describe('Vessel Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getVesselId = (it: Vessel) => it.id;

  let state: VesselPartialState;

  beforeEach(() => {
    state = {
      vessel: vesselAdapter.setAll(
        [
          createVesselEntity(1, 'PRODUCT-AAA'),
          createVesselEntity(2, 'PRODUCT-BBB'),
          createVesselEntity(3, 'PRODUCT-CCC'),
        ],
        {
          ...initialVesselState,
          selectedId: 2,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
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

      expect(result).toBe(ERROR_MSG);
    });
  });
});
