import { Vessel } from '../../models/vessel.models';
import {
  vesselAdapter,
  VesselPartialState,
  initialVesselState,
} from './vessel.reducer';
import * as VesselSelectors from './vessel.selectors';

describe('Vessel Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getVesselId = (it: Vessel) => it.id;
  const createVesselEntity = (id: number, name: string) =>
    ({
      'id': id,
      'name': name,
      'mmsi': 999999901,
      'imo': 1023401,
      'companyId': 2301,
      'companyName': 'Alpha Company',
      'startDate': '1998-01-01T00:00:00Z',
      'active': true,
      'vesselType': 'Dry Cargo'
    } as Vessel);

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
