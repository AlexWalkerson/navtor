import { createAction, props } from '@ngrx/store';
import { EmissionEntity } from './emission.models';

export const initEmission = createAction('[Emission Page] Init');

export const loadEmissionSuccess = createAction(
  '[Emission/API] Load Emission Success',
  props<{ emission: EmissionEntity[] }>()
);

export const loadEmissionFailure = createAction(
  '[Emission/API] Load Emission Failure',
  props<{ error: string }>()
);
