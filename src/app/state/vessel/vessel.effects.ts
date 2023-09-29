import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, tap } from 'rxjs';
import { VesselApiService } from '../../services/vessel-api.service';
import * as VesselActions from './vessel.actions';

@Injectable()
export class VesselEffects {
  private actions$ = inject(Actions);

  constructor(private vesselApi: VesselApiService) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VesselActions.loadVessel),
      switchMap(() => this.vesselApi.fetch()),
      tap(e => console.log(e)),
      switchMap((vessels) => of(VesselActions.loadVesselSuccess({ vessels }))),
      catchError((error) => {
        return of(VesselActions.loadVesselFailure({ error }));
      })
    )
  );
}
