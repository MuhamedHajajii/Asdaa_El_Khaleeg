import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

const cache = new Map<
  string,
  { response: HttpResponse<any>; expiry: number }
>();
const CACHE_DURATION = 2 * 60 * 1000; // 10 minutes

export const homeCacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') return next(req);
  console.log(req.urlWithParams);
  if (req.url.includes('Writer_index')) return next(req);
  if (req.url.includes('blog_store')) return next(req);
  if (req.url.includes('blog_index')) return next(req);
  if (req.url.includes('blog_update_data')) return next(req);
  if (req.url.includes('administrator_index')) return next(req);
  const cacheKey = req.urlWithParams;
  const cached = cache.get(cacheKey);

  if (cached && cached.expiry > Date.now()) {
    console.log('Serving cached response:', cacheKey);
    return of(cached.response.clone());
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(cacheKey, {
          response: event.clone(),
          expiry: Date.now() + CACHE_DURATION,
        });
        console.log('Storing in cache:', cacheKey);
      }
    })
  );
};
