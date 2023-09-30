import { Emissions } from '../models/emissions.model';
import { emissionsAdapter, EmissionsPartialState, initialEmissionsState } from './emissions.reducer';
import * as EmissionsSelectors from './emissions.selectors';
import { createEmissionsEntity } from './mockEmissions';

describe('Emissions Selectors', () => {
  const ERROR = new Error('No Error Available');
  const getEmissionId = (it: Emissions) => it.id;
  let state: EmissionsPartialState;

  beforeEach(() => {
    state = {
      emissions: emissionsAdapter.setAll(
        [
          createEmissionsEntity(11),
          createEmissionsEntity(22),
          createEmissionsEntity(33),
        ],
        {
          ...initialEmissionsState,
          error: ERROR,
          loaded: true,
          loading: false
        }
      ),
    };
  });

  describe('Emissions Selectors', () => {
    it('selectAllEmissions() should return the list of Emissions', () => {
      const results = EmissionsSelectors.selectAllEmissions(state);
      const selId = getEmissionId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe(22);
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = EmissionsSelectors.selectEntity({ ...state, vessel: { selectedId: 22 } }) as Emissions;
      const selId = getEmissionId(result);

      expect(selId).toBe(22);
    });

    it('selectEmissionsLoaded() should return the current "loaded" status', () => {
      const result = EmissionsSelectors.selectEmissionsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectEmissionsLoading() should return the current "loading" status', () => {
      const result = EmissionsSelectors.selectEmissionsLoading(state);

      expect(result).toBe(false);
    });

    it('selectEmissionsError() should return the current "error" state', () => {
      const result = EmissionsSelectors.selectEmissionsError(state);

      expect(result).toBe(ERROR);
    });
  });
});
