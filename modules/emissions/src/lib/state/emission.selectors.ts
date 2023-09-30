import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EMISSION_FEATURE_KEY,
  EmissionState,
  emissionAdapter,
} from './emission.reducer';

// Lookup the 'Emission' feature state managed by NgRx
export const selectEmissionState =
  createFeatureSelector<EmissionState>(EMISSION_FEATURE_KEY);

const { selectAll, selectEntities } = emissionAdapter.getSelectors();

export const selectEmissionLoaded = createSelector(
  selectEmissionState,
  (state: EmissionState) => state.loaded
);

export const selectEmissionError = createSelector(
  selectEmissionState,
  (state: EmissionState) => state.error
);

export const selectAllEmission = createSelector(
  selectEmissionState,
  (state: EmissionState) => selectAll(state)
);

export const selectEmissionEntities = createSelector(
  selectEmissionState,
  (state: EmissionState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectEmissionState,
  (state: EmissionState) => state.selectedId
);

export const selectEntity = createSelector(
  selectEmissionEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
