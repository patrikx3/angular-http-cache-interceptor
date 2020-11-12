import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { DefaultComponentComponent } from './default-component/default-component.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {HttpClientModule} from "@angular/common/http";

import { HighlightService } from "./highlight.service";

@NgModule({
  declarations: [DefaultComponentComponent],
  imports: [
    AngularCommonModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDividerModule,
    HttpClientModule,
  ],
  providers: [
    HighlightService
  ],
  exports: [
    DefaultComponentComponent,
  ]
})
export class CommonModule { }
