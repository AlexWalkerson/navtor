import { Routes } from '@angular/router';
import { EmissionsApiService } from './services/emissions-api.service';
import { EmissionsComponent } from './emissions/emissions.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromEmissions from './state/emissions.reducer';
import { EmissionsEffects } from './state/emissions.effects';

export default [
  {
    path: '',
    component: EmissionsComponent,
    providers: [
      provideState(
        fromEmissions.EMISSIONS_FEATURE_KEY,
        fromEmissions.emissionsReducer
      ),
      provideEffects(EmissionsEffects),
      EmissionsApiService
    ],
  },
] satisfies Routes;
