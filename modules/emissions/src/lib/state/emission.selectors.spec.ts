import { EmissionEntity } from './emission.models';
import {
  emissionAdapter,
  EmissionPartialState,
  initialEmissionState,
} from './emission.reducer';
import * as EmissionSelectors from './emission.selectors';

describe('Emission Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEmissionId = (it: EmissionEntity) => it.id;
  const createEmissionEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EmissionEntity);

  let state: EmissionPartialState;

  beforeEach(() => {
    state = {
      emission: emissionAdapter.setAll(
        [
          createEmissionEntity('PRODUCT-AAA'),
          createEmissionEntity('PRODUCT-BBB'),
          createEmissionEntity('PRODUCT-CCC'),
        ],
        {
          ...initialEmissionState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Emission Selectors', () => {
    it('selectAllEmission() should return the list of Emission', () => {
      const results = EmissionSelectors.selectAllEmission(state);
      const selId = getEmissionId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = EmissionSelectors.selectEntity(state) as EmissionEntity;
      const selId = getEmissionId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEmissionLoaded() should return the current "loaded" status', () => {
      const result = EmissionSelectors.selectEmissionLoaded(state);

      expect(result).toBe(true);
    });

    it('selectEmissionError() should return the current "error" state', () => {
      const result = EmissionSelectors.selectEmissionError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
