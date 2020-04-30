import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//import { P3XHttpCacheInterceptorModule  } from '../../projects/angular-http-cache-interceptor/src/lib/http-cache-interceptor.module'
import { P3XHttpCacheInterceptorModule  } from 'p3x-interceptor'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    P3XHttpCacheInterceptorModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
