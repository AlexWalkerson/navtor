import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { VesselApiService } from '../../services/vessel-api.service';
import * as VesselActions from './vessel.actions';

@Injectable()
export class VesselEffects {
  private actions$ = inject(Actions);
  private vesselApi = inject(VesselApiService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VesselActions.loadVessel),
      switchMap(() => this.vesselApi.fetch().pipe(
        map((vessels) => VesselActions.loadVesselSuccess({ vessels })),
        catchError((error: HttpErrorResponse) => {
          console.error('Error', error);
          return of(VesselActions.loadVesselFailure({ error }));
        })
      ))
    )
  );
}
