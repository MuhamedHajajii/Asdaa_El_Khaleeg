import { ApplicationConfig } from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { IMAGE_CONFIG } from '@angular/common';
import { loadingSpinnerInterceptor } from './core/interceptors/loading-spinner.interceptor';
import { homeCacheInterceptor } from './core/interceptors/home-cache.interceptor';
import { provideToastr } from 'ngx-toastr';
const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature, withViewTransitions()),
    provideClientHydration(),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-left',
      timeOut: 2000,
    }),
    provideHttpClient(
      withFetch(),
      withInterceptors([loadingSpinnerInterceptor, homeCacheInterceptor])
    ),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
  ],
};
