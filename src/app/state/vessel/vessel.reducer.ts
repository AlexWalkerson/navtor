import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as VesselActions from './vessel.actions';
import { VesselEntity } from './vessel.models';

export const VESSEL_FEATURE_KEY = 'vessel';

export interface VesselState extends EntityState<VesselEntity> {
  selectedId?: string | number; // which Vessel record has been selected
  loaded: boolean; // has the Vessel list been loaded
  error?: string | null; // last known error (if any)
}

export interface VesselPartialState {
  readonly [VESSEL_FEATURE_KEY]: VesselState;
}

export const vesselAdapter: EntityAdapter<VesselEntity> =
  createEntityAdapter<VesselEntity>();

export const initialVesselState: VesselState = vesselAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialVesselState,
  on(VesselActions.loadVessel, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(VesselActions.loadVesselSuccess, (state, { vessel }) =>
    vesselAdapter.setAll(vessel, { ...state, loaded: true })
  ),
  on(VesselActions.loadVesselFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function vesselReducer(state: VesselState | undefined, action: Action) {
  return reducer(state, action);
}
