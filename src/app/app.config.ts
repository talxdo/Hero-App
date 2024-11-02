import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import {provideRouter, withComponentInputBinding, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions({
        skipInitialTransition: true
      })
    ),
    provideHttpClient(
      withFetch()), provideAnimationsAsync()]
};
