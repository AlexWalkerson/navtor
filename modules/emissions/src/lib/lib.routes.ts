import { Routes } from '@angular/router';
import { EmissionApiService } from './services/emission-api.service';
import { EmissionsComponent } from './emissions/emissions.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromEmission from './state/emission.reducer';
import { EmissionEffects } from './state/emission.effects';

export default [
  {
    path: '',
    component: EmissionsComponent,
    providers: [
      provideState(
        fromEmission.EMISSION_FEATURE_KEY,
        fromEmission.emissionReducer
      ),
      provideEffects(EmissionEffects),
      EmissionApiService
    ],
  },
] satisfies Routes;
