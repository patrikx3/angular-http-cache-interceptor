import {
    EnvironmentProviders,
    makeEnvironmentProviders,
    ModuleWithProviders,
    NgModule,
    Provider,
} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpCacheInterceptorInterceptor } from './http-cache-interceptor.interceptor';
import { P3X_HTTP_CACHE_CONFIG } from './http-cache-config.token';
import { HttpCacheConfig } from './http-cache-config';

/**
 * Standalone / functional-provider helper.
 *
 * Usage in `app.config.ts`:
 * ```ts
 * provideHttpClient(withInterceptors([p3xHttpCacheInterceptor])),
 * provideP3xHttpCacheInterceptor({ behavior: CachingHeaders.Cache, store: CachingStore.Global }),
 * ```
 */
export function provideP3xHttpCacheInterceptor(
    httpCacheConfig: HttpCacheConfig,
): EnvironmentProviders {
    return makeEnvironmentProviders([
        { provide: P3X_HTTP_CACHE_CONFIG, useValue: httpCacheConfig },
    ]);
}

/**
 * Legacy NgModule — kept intact for consumers that still bootstrap via
 * `@NgModule({ imports: [P3XHttpCacheInterceptorModule.forRoot(...)] })`
 * and register the class interceptor through `HTTP_INTERCEPTORS`.
 *
 * New code should prefer `provideP3xHttpCacheInterceptor()` +
 * `p3xHttpCacheInterceptor` (functional).
 */
@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpCacheInterceptorInterceptor,
            multi: true,
        },
    ],
})
export class P3XHttpCacheInterceptorModule {
    static forRoot(httpCacheConfig: HttpCacheConfig): ModuleWithProviders<P3XHttpCacheInterceptorModule> {
        const providers: Provider[] = [
            {
                provide: P3X_HTTP_CACHE_CONFIG,
                useValue: httpCacheConfig,
            },
        ];
        return {
            ngModule: P3XHttpCacheInterceptorModule,
            providers,
        };
    }
}
