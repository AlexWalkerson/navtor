import { createAction, props } from '@ngrx/store';
import { Vessel } from '../../models/vessel.models';

export const loadVessel = createAction('[Vessel/API] Load');

export const loadVesselSuccess = createAction(
  '[Vessel/API] Load Vessel Success',
  props<{ vessels: Vessel[] }>()
);

export const loadVesselFailure = createAction(
  '[Vessel/API] Load Vessel Failure',
  props<{ error: Error }>()
);

export const selectVessel = createAction(
  '[Vessel] Select',
  props<{ id: number }>()
);
