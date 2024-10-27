import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    //provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true
      })
    ), 
    provideHttpClient(
      withFetch())]
};
