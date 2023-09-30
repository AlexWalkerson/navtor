import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as EmissionsActions from './emissions.actions';
import { Emissions } from '../models/emissions.model';

export const EMISSIONS_FEATURE_KEY = 'emissions';

export interface EmissionsState extends EntityState<Emissions> {
  loaded: boolean; // has the Emissions list been loaded
  loading: boolean;
  error?: Error | null; // last known error (if any)
}

export interface EmissionsPartialState {
  readonly [EMISSIONS_FEATURE_KEY]: EmissionsState;
}

export const emissionsAdapter: EntityAdapter<Emissions> =
  createEntityAdapter<Emissions>();

export const initialEmissionsState: EmissionsState =
  emissionsAdapter.getInitialState({
    // set initial required properties
    loaded: false,
    loading: false
  });

const reducer = createReducer(
  initialEmissionsState,
  on(EmissionsActions.loadEmissions, (state) => ( {
    ...state,
    loaded: false,
    loading: true,
    error: null
  } )),
  on(EmissionsActions.loadEmissionsSuccess, (state, { emissions }) =>
    emissionsAdapter.setAll(emissions, {
      ...state,
      loaded: true,
      loading: false
    })
  ),
  on(EmissionsActions.loadEmissionsFailure, (state, { error }) => ( {
    ...state,
    error
  } ))
);

export function emissionsReducer(
  state: EmissionsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
