import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { EmissionsComponent } from './emissions/emissions.component';
import { EmissionsApiService } from './services/emissions-api.service';
import { VesselApiService } from './services/vessel-api.service';
import { VesselFacade } from './services/vessel.facade';
import { EmissionsEffects } from './state/emissions/emissions.effects';
import { FEATURE_NAME, reducers } from './state/reducers';
import { VesselEffects } from './state/vessel/vessel.effects';
import { VesselsComponent } from './vessels/vessels.component';

export default [
  {
    path: '',
    providers: [
      provideState(FEATURE_NAME, reducers),
      provideEffects([VesselEffects, EmissionsEffects]),
      VesselApiService,
      VesselFacade,
      EmissionsApiService
    ],
    children: [
      {
        path: 'vessels',
        component: VesselsComponent,
        data: { title: 'Vessels' }
      },
      {
        path: 'emissions',
        component: EmissionsComponent,
        data: { title: 'Emissions' }
      }
    ]
  }
] satisfies Routes;
