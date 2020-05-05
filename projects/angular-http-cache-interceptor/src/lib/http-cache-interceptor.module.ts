import {ModuleWithProviders, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { HttpCacheInterceptorInterceptor } from './http-cache-interceptor.interceptor'

import { P3X_HTTP_CACHE_CONFIG } from "./http-cache-config.token";
import { HttpCacheConfig } from "./http-cache-config";

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCacheInterceptorInterceptor,
      multi: true
    }
  ],
  exports: []
})
export class P3XHttpCacheInterceptorModule {

  static forRoot(httpCacheConfig: HttpCacheConfig): ModuleWithProviders {
    return {
      ngModule: P3XHttpCacheInterceptorModule,
      providers: [
        {
          provide: P3X_HTTP_CACHE_CONFIG,
          useValue: httpCacheConfig
        }
      ]
    };
  }

}
