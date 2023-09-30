import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as EmissionActions from './emission.actions';
import { EmissionEntity } from './emission.models';

export const EMISSION_FEATURE_KEY = 'emission';

export interface EmissionState extends EntityState<EmissionEntity> {
  selectedId?: string | number; // which Emission record has been selected
  loaded: boolean; // has the Emission list been loaded
  error?: string | null; // last known error (if any)
}

export interface EmissionPartialState {
  readonly [EMISSION_FEATURE_KEY]: EmissionState;
}

export const emissionAdapter: EntityAdapter<EmissionEntity> =
  createEntityAdapter<EmissionEntity>();

export const initialEmissionState: EmissionState =
  emissionAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialEmissionState,
  on(EmissionActions.initEmission, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(EmissionActions.loadEmissionSuccess, (state, { emission }) =>
    emissionAdapter.setAll(emission, { ...state, loaded: true })
  ),
  on(EmissionActions.loadEmissionFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function emissionReducer(
  state: EmissionState | undefined,
  action: Action
) {
  return reducer(state, action);
}
