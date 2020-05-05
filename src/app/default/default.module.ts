import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import {DefaultRoutingModule} from "./default-routing.module";
import {CommonModule} from "../common/common.module";

import {P3XHttpCacheInterceptorModule} from '../../../projects/angular-http-cache-interceptor/src/lib/http-cache-interceptor.module';
//import {CachingHeaders} from "../../../projects/angular-http-cache-interceptor/src/lib/caching-headers.enum";
//import { P3XHttpCacheInterceptorModule  } from 'p3x-interceptor'

import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  declarations: [
    BootstrapComponent,
  ],
  imports: [
    P3XHttpCacheInterceptorModule,
    AngularCommonModule,
    DefaultRoutingModule,
    CommonModule,
    MatDividerModule,
  ],

})
export class DefaultModule { }
