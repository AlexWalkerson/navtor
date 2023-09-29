import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { VesselFacade } from './services/vessel.facade';
import { appRoutes } from './app.routes';
import { VesselEffects } from './state/vessel/vessel.effects';
import * as fromVessel from './state/vessel/vessel.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideStore(),
    provideState(fromVessel.VESSEL_FEATURE_KEY, fromVessel.vesselReducer),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideEffects(VesselEffects),
    VesselFacade,
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  ],
};
