import { createSelector } from '@ngrx/store';
import { selectFeatureState } from '../reducers';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { selectSelectedId as vesselSelectSelectedId } from '../vessel/vessel.selectors';
import { EMISSIONS_FEATURE_KEY, emissionsAdapter, EmissionsState } from './emissions.reducer';

// Lookup the 'Emission' feature state managed by NgRx
export const selectEmissionsState = createSelector(
  selectFeatureState,
  (state) => state[EMISSIONS_FEATURE_KEY]
)

const { selectAll, selectEntities } = emissionsAdapter.getSelectors();

export const selectEmissionsLoaded = createSelector(
  selectEmissionsState,
  (state: EmissionsState) => state.loaded
);

export const selectEmissionsLoading = createSelector(
  selectEmissionsState,
  (state: EmissionsState) => state.loading
);

export const selectEmissionsError = createSelector(
  selectEmissionsState,
  (state: EmissionsState) => state.error
);

export const selectAllEmissions = createSelector(
  selectEmissionsState,
  (state: EmissionsState) => selectAll(state)
);

export const selectEmissionsEntities = createSelector(
  selectEmissionsState,
  (state: EmissionsState) => selectEntities(state)
);

export const selectEntity = createSelector(
  selectEmissionsEntities,
  vesselSelectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
