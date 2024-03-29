import {NgModule} from '@angular/core';
import {CommonModule as AngularCommonModule} from '@angular/common';
import {BootstrapComponent} from './bootstrap/bootstrap.component';
import {CacheRoutingModule} from "./cache-routing.module";
import {CommonModule} from "../common/common.module";

import {P3XHttpCacheInterceptorModule} from '../../../projects/angular-http-cache-interceptor/src/lib/http-cache-interceptor.module';
import {CachingHeaders} from "../../../projects/angular-http-cache-interceptor/src/lib/caching-headers.enum";
import {CachingStore} from "../../../projects/angular-http-cache-interceptor/src/lib/caching-store.enum";

import { MatDividerModule } from "@angular/material/divider";

@NgModule({
    imports: [
        P3XHttpCacheInterceptorModule.forRoot({
            behavior: CachingHeaders.Cache,
            store: CachingStore.Global,
        }),
        AngularCommonModule,
        CacheRoutingModule,
        CommonModule,
        MatDividerModule,
        BootstrapComponent,
    ],
})
export class CacheModule { }
