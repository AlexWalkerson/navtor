import { createSelector } from '@ngrx/store';
import { selectFeatureState } from '../reducers';
import { VESSEL_FEATURE_KEY, vesselAdapter, VesselState } from './vessel.reducer';

// Lookup the 'Vessel' feature state managed by NgRx
export const selectVesselState = createSelector(
  selectFeatureState,
  (state) => state[VESSEL_FEATURE_KEY]
);

const { selectAll, selectEntities } = vesselAdapter.getSelectors();

export const selectVesselLoaded = createSelector(
  selectVesselState,
  (state: VesselState) => state.loaded
);

export const selectVesselError = createSelector(
  selectVesselState,
  (state: VesselState) => state.error
);

export const selectAllVessel = createSelector(
  selectVesselState,
  (state: VesselState) => selectAll(state)
);

export const selectVesselEntities = createSelector(
  selectVesselState,
  (state: VesselState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectVesselState,
  (state: VesselState) => state.selectedId
);

export const selectEntity = createSelector(
  selectVesselEntities,
  selectSelectedId,
  (entities, selectedId) => ( selectedId ? entities[selectedId] : undefined )
);
