import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as EmissionActions from './emission.actions';

@Injectable()
export class EmissionEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmissionActions.initEmission),
      switchMap(() =>
        of(EmissionActions.loadEmissionSuccess({ emission: [] }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(EmissionActions.loadEmissionFailure({ error }));
      })
    )
  );
}
