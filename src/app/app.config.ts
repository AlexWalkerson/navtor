import { ApplicationConfig } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { appRoutes } from './app.routes';
import { VesselEffects } from './state/vessel/vessel.effects';
import { VesselFacade } from './state/vessel/vessel.facade';
import * as fromVessel from './state/vessel/vessel.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(VesselEffects),
    provideState(fromVessel.VESSEL_FEATURE_KEY, fromVessel.vesselReducer),
    VesselFacade,
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  ],
};
