import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as VesselActions from './vessel.actions';

@Injectable()
export class VesselEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VesselActions.loadVessel),
      switchMap(() => of(VesselActions.loadVesselSuccess({ vessel: [] }))),
      catchError((error) => {
        return of(VesselActions.loadVesselFailure({ error }));
      })
    )
  );
}
