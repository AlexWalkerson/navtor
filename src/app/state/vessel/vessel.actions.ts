import { createAction, props } from '@ngrx/store';
import { VesselEntity } from './vessel.models';

export const loadVessel = createAction('[Vessel/API] Load');

export const loadVesselSuccess = createAction(
  '[Vessel/API] Load Vessel Success',
  props<{ vessel: VesselEntity[] }>()
);

export const loadVesselFailure = createAction(
  '[Vessel/API] Load Vessel Failure',
  props<{ error: any }>()
);
