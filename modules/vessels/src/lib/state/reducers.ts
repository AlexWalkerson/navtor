import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { EMISSIONS_FEATURE_KEY, EmissionsPartialState, emissionsReducer } from './emissions/emissions.reducer';
import { VESSEL_FEATURE_KEY, VesselPartialState, vesselReducer } from './vessel/vessel.reducer';

export const FEATURE_NAME = 'vesselFeature';

export interface FeatureState extends EmissionsPartialState, VesselPartialState {
}

export const reducers: ActionReducerMap<FeatureState> = {
  [VESSEL_FEATURE_KEY]: vesselReducer,
  [EMISSIONS_FEATURE_KEY]: emissionsReducer
};

export const selectFeatureState =
  createFeatureSelector<FeatureState>(FEATURE_NAME);



