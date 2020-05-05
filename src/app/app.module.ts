import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTabsModule} from "@angular/material/tabs";

import { AppRoutingModule } from "./app-routing.module";
import {MatCardModule} from "@angular/material/card";

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);

window['hljs'] = hljs

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,

    BrowserAnimationsModule,
    //MatProgressSpinnerModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
