import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { P3XHttpCacheInterceptorModule  } from '../../projects/angular-http-cache-interceptor/src/lib/http-cache-interceptor.module';
//import { P3XHttpCacheInterceptorModule  } from 'p3x-interceptor'

//import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { MatSnackBarModule} from "@angular/material/snack-bar";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    P3XHttpCacheInterceptorModule,
    BrowserAnimationsModule,
    //MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    HttpClientModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
