[//]: #@corifeus-header

  [![NPM](https://img.shields.io/npm/v/p3x-angular-http-cache-interceptor.svg)](https://www.npmjs.com/package/p3x-angular-http-cache-interceptor)  [![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://paypal.me/patrikx3) [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Corifeus @ Facebook](https://img.shields.io/badge/Facebook-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)  [![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m780749701-41bcade28c1ea8154eda7cca.svg)](https://stats.uptimerobot.com/9ggnzcWrw)





# 🔥 Cache every request in Angular, not only the GET, but all methods of this interceptor, and allows you to interact with the interceptor via specific headers and modify the request, and these specific headers will be not included in the final request v2025.4.108



**Bugs are evident™ - MATRIX️**
    



### NodeJS LTS is supported

### Built on NodeJs version

```txt
v22.13.0
```




# Built on Angular

```text
19.0.6
```



# Description

                        
[//]: #@corifeus-header:end

<!--
Based on [@d4h/angular-http-cache](https://www.npmjs.com/package/@d4h/angular-http-cache), but it works without any configuration and a different implementation, so they are not the same at all, but the idea is the same.
-->

Usually, when you want to cache all requests, you do not cache all requests, but only the `GET` method. But, for some frontend applications, it is required to cache everything, otherwise the subsequent requests, without cache, would slow down the application flow.  So, this micro-service caches all method/path/query variables/parameters/request body.
  
The way, we can find out what we are caching it is not simple. Usually, you would cache by a key of the `httpRequest.urlWithParams` and only the `GET` HTTP method.

To create this cache key, this package is using the `object-hash` package, with the following algorithm:
```ts
import hash from 'object-hash'

const hashOptions = {
  algorithm: 'md5',
  encoding: 'hex'
}

httpToKey(httpRequest: HttpRequest<any>) {
    const key = httpRequest.method + '@' + httpRequest.urlWithParams + '@' + hash(httpRequest.params, hashOptions) + '@' + hash(httpRequest.body, hashOptions)
    return key
}
```

There is room in the future, to restrict to specific methods and add more configurations and functions. If there is a need for this micro-service, it could be enhanced, but for now, it is caching everything, with the exception, when you include the `CachingHeaders.NoCache` header into your request, then this request will always hit the server. 

# Example web page that uses this package
https://angular-http-cache-interceptor.corifeus.com

# How to use it

```bash
npm i p3x-angular-http-cache-interceptor object-hash
```

## Include the caching interceptor into your Angular module
```ts
import { NgModule } from '@angular/core';

import { P3XHttpCacheInterceptorModule  } from 'p3x-angular-http-cache-interceptor';

@NgModule({
  declarations: [
  ],
  imports: [
    P3XHttpCacheInterceptorModule,
  ],
  providers: [
  ],
  bootstrap: []
})
export class SomeModule { }
```

### Options
```ts
import { P3XHttpCacheInterceptorModule, CachingHeaders, CachingStore  } from 'p3x-angular-http-cache-interceptor';

P3XHttpCacheInterceptorModule.forRoot({
    // default request is no cache
    behavior: CachingHeaders.NoCache,
    
    // if a request has CachingHeaders.Cache header it will cache globally
    store: CachingStore.Global,
})

P3XHttpCacheInterceptorModule.forRoot({
    // default request is cache
    behavior: CachingHeaders.Cache,

    // in this config, it will cache not globally, but per module
    store: CachingStore.PerModule,
})
```

## Example invocation in a component

With and without cache:
```ts
import { Component } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

import { CachingHeaders } from 'p3x-angular-http-cache-interceptor'

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
      this.snack.open(`Sorry, error happened, check the console for the error`, 'OK')
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
```



[//]: #@corifeus-footer

---


## Quick and Affordable Web Development Services

If you want to quickly and affordably develop your next digital project, visit [corifeus.eu](https://corifeus.eu) for expert solutions tailored to your needs.

---

## Powerful Online Networking Tool  

Discover the powerful and free online networking tool at [network.corifeus.com](https://network.corifeus.com).  

**Free**  
Designed for professionals and enthusiasts, this tool provides essential features for network analysis, troubleshooting, and management.  
Additionally, it offers tools for:  
- Monitoring TCP, HTTP, and Ping to ensure optimal network performance and reliability.  
- Status page management to track uptime, performance, and incidents in real time with customizable dashboards.  

All these features are completely free to use.
  
## Support Our Open-Source Project ❤️
If you appreciate our work, consider starring this repository or making a donation to support server maintenance and ongoing development. Your support means the world to us—thank you!

### Server Availability
Our server may occasionally be down, but please be patient. Typically, it will be back online within 15-30 minutes. We appreciate your understanding.

### About My Domains
All my domains, including [patrikx3.com](https://patrikx3.com), [corifeus.hu](https://corifeus.hu) and [corifeus.com](https://corifeus.com), are developed in my spare time. While you may encounter minor errors, the sites are generally stable and fully functional.

### Versioning Policy
**Version Structure:** We follow a Major.Minor.Patch versioning scheme:
- **Major:** Corresponds to the current year.
- **Minor:** Set as 4 for releases from January to June, and 10 for July to December.
- **Patch:** Incremental, updated with each build.

**Important Changes:** Any breaking changes are prominently noted in the readme to keep you informed.

---


[**P3X-ANGULAR-HTTP-CACHE-INTERCEPTOR**](https://corifeus.com/angular-http-cache-interceptor) Build v2025.4.108

 [![NPM](https://img.shields.io/npm/v/p3x-angular-http-cache-interceptor.svg)](https://www.npmjs.com/package/p3x-angular-http-cache-interceptor)  [![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)






[//]: #@corifeus-footer:end
