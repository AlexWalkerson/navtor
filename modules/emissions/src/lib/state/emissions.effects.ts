import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { EmissionsApiService } from '../services/emissions-api.service';
import { switchMap, catchError, of } from 'rxjs';
import * as EmissionsActions from './emissions.actions';

@Injectable()
export class EmissionsEffects {
  private actions$ = inject(Actions);
  private emissionsApi = inject(EmissionsApiService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmissionsActions.loadEmissions),
      switchMap(() => this.emissionsApi.fetch()),
      switchMap((emissions) =>
        of(EmissionsActions.loadEmissionsSuccess({ emissions }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(EmissionsActions.loadEmissionsFailure({ error }));
      })
    )
  );
}
