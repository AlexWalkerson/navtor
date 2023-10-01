import { createAction, props } from '@ngrx/store';
import { Emissions } from '../../models/emissions.model';

export const loadEmissions = createAction('[Emission/API] Load Emissions');

export const loadEmissionsSuccess = createAction(
  '[Emission/API] Load Emissions Success',
  props<{ emissions: Emissions[] }>()
);

export const loadEmissionsFailure = createAction(
  '[Emission/API] Load Emissions Failure',
  props<{ error: Error }>()
);
