import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { EmissionsApiService } from '../../services/emissions-api.service';
import * as EmissionsActions from './emissions.actions';

@Injectable()
export class EmissionsEffects {
  private actions$ = inject(Actions);
  private emissionsApi = inject(EmissionsApiService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmissionsActions.loadEmissions),
      switchMap(() => this.emissionsApi.fetch().pipe(
        map((emissions) =>
          EmissionsActions.loadEmissionsSuccess({ emissions })
        ),
        catchError((error) => {
          console.error('Error', error);
          return of(EmissionsActions.loadEmissionsFailure({ error }));
        })
      )),
      catchError((error) => {
        console.error('Error', error);
        return of(EmissionsActions.loadEmissionsFailure({ error }));
      })
    )
  );
}
