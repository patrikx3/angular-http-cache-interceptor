import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { HttpCacheInterceptorInterceptor } from './http-cache-interceptor.interceptor'

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
export class P3XHttpCacheInterceptorModule { }
