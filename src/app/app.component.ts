import { Component } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

//import { CachingHeaders} from "../../projects/angular-http-cache-interceptor/src/lib/caching-headers.enum";
import { CachingHeaders} from "p3x-interceptor";

@Component({
  selector: 'p3x-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
  ) {
  }

  async loadCached() {
    try {
      const response : any = await this.http.get('https://server.patrikx3.com/api/core/util/random/32').toPromise()
      this.snack.open(`Will be always the same: ${response.random}`, 'OK')
    } catch(e) {
      this.snack.open(`Sorry, error happened, check the consle for the error`, 'OK')
      console.error(e)
    }
  }

  async loadNonCached() {
    try {
      const response : any = await this.http.get('https://server.patrikx3.com/api/core/util/random/32', {
        headers: {
          [CachingHeaders.NoCache]: '1'
        }
      }).toPromise()
      this.snack.open(`Truly random data: ${response.random}`, 'OK')
    } catch(e) {
      this.snack.open(`Sorry, error happened, check the console for the error`, 'OK')
      console.error(e)
    }
  }

}
