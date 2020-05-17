import {Component, ViewEncapsulation} from '@angular/core';

import { HttpClient } from "@angular/common/http";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

import { CachingHeaders} from "../../../../projects/angular-http-cache-interceptor/src/lib/caching-headers.enum";


@Component({
  selector: 'p3x-default-component',
  templateUrl: './default-component.component.html',
  styleUrls: ['./default-component.component.scss'],

  //FIXME why do we have to use ViewEncapsulation.None?
  //encapsulation: ViewEncapsulation.None
})
export class DefaultComponentComponent  {

  defaultSnackbarSettings : MatSnackBarConfig = {
    horizontalPosition: "center",
    verticalPosition: "bottom"
  }

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
  ) {
  }

  async loadDefault() {
    try {
      const response : any = await this.http.get('https://server.patrikx3.com/api/core/util/random/32').toPromise()
      this.snack.open(`The output is based on the default intercaptor behavior: ${response.random}`, 'OK', this.defaultSnackbarSettings)
    } catch(e) {
      this.snack.open(`Sorry, error happened, check the console for the error`, 'OK', this.defaultSnackbarSettings)
      console.error(e)
    }

  }

  async loadCached() {
    try {
      const response : any = await this.http.get('https://server.patrikx3.com/api/core/util/random/32', {
        headers: {
          [CachingHeaders.Cache]: '1',
        }
      }).toPromise()
      this.snack.open(`Will be always the same output: ${response.random}`, 'OK', this.defaultSnackbarSettings)
    } catch(e) {
      this.snack.open(`Sorry, error happened, check the console for the error`, 'OK', this.defaultSnackbarSettings)
      console.error(e)
    }
  }

  async loadNonCached() {
    try {
      const response : any = await this.http.get('https://server.patrikx3.com/api/core/util/random/16', {
        headers: {
          [CachingHeaders.NoCache]: '1',
        }
      }).toPromise()
      this.snack.open(`Truly random data: ${response.random}`, 'OK', this.defaultSnackbarSettings)
    } catch(e) {
      this.snack.open(`Sorry, error happened, check the console for the error`, 'OK', this.defaultSnackbarSettings)
      console.error(e)
    }
  }

}
