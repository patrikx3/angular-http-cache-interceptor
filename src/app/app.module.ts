import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularHttpCacheInterceptorModule } from '../../projects/angular-http-cache-interceptor/src/lib/angular-http-cache-interceptor.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularHttpCacheInterceptorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
