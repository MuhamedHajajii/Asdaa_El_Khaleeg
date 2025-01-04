import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

// Create a simple cache map
const cache = new Map<
  string,
  { response: HttpResponse<any>; expiry: number }
>();
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

export const homeCacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    return next(req);
  }

  const cached = cache.get(req.url);
  if (cached && cached.expiry > Date.now()) {
    return of(cached.response.clone());
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(req.url, {
          response: event.clone(),
          expiry: Date.now() + CACHE_DURATION,
        });
      }
    })
  );
};
