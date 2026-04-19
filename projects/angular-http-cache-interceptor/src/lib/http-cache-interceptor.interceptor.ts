import { inject, Injectable, Optional, Inject } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpInterceptorFn,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import hash from 'object-hash';

import { CachingHeaders } from './caching-headers.enum';
import { CachingStore } from './caching-store.enum';
import { P3X_HTTP_CACHE_CONFIG } from './http-cache-config.token';
import { HttpCacheConfig } from './http-cache-config';

const hashOptions = {
    algorithm: 'md5',
    encoding: 'hex',
} as const;

const globalCache = new Map<string, HttpResponse<any>>();

const DEFAULT_CONFIG: HttpCacheConfig = {
    behavior: CachingHeaders.Cache,
    store: CachingStore.Global,
};

function httpToKey(httpRequest: HttpRequest<any>): string {
    const body = JSON.parse(JSON.stringify(httpRequest.body));
    return (
        httpRequest.method +
        '@' + httpRequest.urlWithParams +
        '@' + hash(httpRequest.params, hashOptions) +
        '@' + hash(body, hashOptions)
    );
}

function handle(
    httpRequest: HttpRequest<unknown>,
    next: (req: HttpRequest<unknown>) => Observable<HttpEvent<unknown>>,
    config: HttpCacheConfig,
    perInstanceCache: Map<string, HttpResponse<any>>,
): Observable<HttpEvent<unknown>> {
    const forcedCache = httpRequest.headers.get(CachingHeaders.Cache) !== null;
    const forcedNoneCache = httpRequest.headers.get(CachingHeaders.NoCache) !== null;

    let headers = httpRequest.headers.delete(CachingHeaders.NoCache);
    headers = headers.delete(CachingHeaders.Cache);
    httpRequest = httpRequest.clone({ headers });

    if (forcedCache && forcedNoneCache) {
        throw new Error('You cannot use cache and non-cache header at once!');
    }

    if (forcedNoneCache || (config.behavior === CachingHeaders.NoCache && !forcedCache)) {
        return next(httpRequest);
    }

    if (forcedCache || (config.behavior === CachingHeaders.Cache && !forcedNoneCache)) {
        const store = config.store === CachingStore.Global ? globalCache : perInstanceCache;
        const key = httpToKey(httpRequest);
        const lastResponse = store.get(key);
        if (lastResponse) {
            return of(lastResponse.clone());
        }
        return next(httpRequest).pipe(
            tap((stateEvent) => {
                if (stateEvent instanceof HttpResponse) {
                    store.set(key, stateEvent.clone());
                }
            }),
        );
    }

    console.error(config);
    console.error(httpRequest.headers);
    throw new Error('There is a configuration in your setup');
}

/*
  Functional-interceptor path: there is no "module instance" to own a
  PerModule cache, so PerModule falls back to this module-level map (one
  per root injector, effectively Global-equivalent). The class-based
  interceptor below still honours true PerModule via its instance field.
*/
const functionalPerInstanceCache = new Map<string, HttpResponse<any>>();

/**
 * Functional interceptor. Use with:
 *   `provideHttpClient(withInterceptors([p3xHttpCacheInterceptor]))`
 * or the convenience `provideP3xHttpCacheInterceptor(config)` helper.
 */
export const p3xHttpCacheInterceptor: HttpInterceptorFn = (httpRequest, next) => {
    const config = inject(P3X_HTTP_CACHE_CONFIG, { optional: true }) ?? DEFAULT_CONFIG;
    return handle(httpRequest, (req) => next(req), config, functionalPerInstanceCache);
};

/**
 * Class-based interceptor — legacy shim kept for consumers still registering
 * via `HTTP_INTERCEPTORS` / `P3XHttpCacheInterceptorModule.forRoot(...)`.
 * Prefer `p3xHttpCacheInterceptor` (functional) for new code.
 */
@Injectable()
export class HttpCacheInterceptorInterceptor implements HttpInterceptor {
    private readonly cachedData = new Map<string, HttpResponse<any>>();
    private readonly httpCacheConfig: HttpCacheConfig;

    constructor(@Inject(P3X_HTTP_CACHE_CONFIG) @Optional() httpCacheConfigToken: HttpCacheConfig | null) {
        this.httpCacheConfig = httpCacheConfigToken ?? DEFAULT_CONFIG;
    }

    intercept(httpRequest: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return handle(httpRequest, (req) => next.handle(req), this.httpCacheConfig, this.cachedData);
    }
}
