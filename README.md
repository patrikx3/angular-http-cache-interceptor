[//]: #@corifeus-header

  [![NPM](https://img.shields.io/npm/v/p3x-angular-http-cache-interceptor.svg)](https://www.npmjs.com/package/p3x-angular-http-cache-interceptor)  [![Donate for PatrikX3 / P3X](https://img.shields.io/badge/Donate-PatrikX3-003087.svg)](https://paypal.me/patrikx3) [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Corifeus @ Facebook](https://img.shields.io/badge/Facebook-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)  [![Uptime ratio (90 days)](https://network.corifeus.com/public/api/uptime-shield/31ad7a5c194347c33e5445dbaf8.svg)](https://network.corifeus.com/status/31ad7a5c194347c33e5445dbaf8)





# 🔥 Cache every request in Angular, not only the GET, but all methods of this interceptor, and allows you to interact with the interceptor via specific headers and modify the request, and these specific headers will be not included in the final request v2026.4.102


  
🌌 **Bugs are evident™ - MATRIX️**  
🚧 **This project is under active development!**  
📢 **We welcome your feedback and contributions.**  
    



### NodeJS LTS is supported

### 🛠️ Built on NodeJs version

```txt
v24.14.1
```




# 📦 Built on Angular

```text
21.2.6
```



# 📝 Description

                        
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

Two ways to register the interceptor — **standalone** (recommended for new code) or **NgModule** (legacy, fully supported).

## Standalone / functional interceptor (Angular 16+)

In your `app.config.ts` (or wherever you build `ApplicationConfig`):

```ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import {
  p3xHttpCacheInterceptor,
  provideP3xHttpCacheInterceptor,
  CachingHeaders,
  CachingStore,
} from 'p3x-angular-http-cache-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([p3xHttpCacheInterceptor])),
    provideP3xHttpCacheInterceptor({
      behavior: CachingHeaders.Cache,
      store: CachingStore.Global,
    }),
  ],
};
```

The functional interceptor also works transparently with `httpResource()` — every call made through `HttpClient` (including `httpResource`) goes through the interceptor chain.

## NgModule (legacy, unchanged)

```ts
import { NgModule } from '@angular/core';

import { P3XHttpCacheInterceptorModule } from 'p3x-angular-http-cache-interceptor';

@NgModule({
  imports: [
    P3XHttpCacheInterceptorModule.forRoot({
      behavior: CachingHeaders.Cache,
      store: CachingStore.Global,
    }),
  ],
})
export class SomeModule {}
```

### Configuration options

```ts
import { CachingHeaders, CachingStore } from 'p3x-angular-http-cache-interceptor';

// Opt-in: only cache when the request carries the Cache header
{
  behavior: CachingHeaders.NoCache,
  store: CachingStore.Global,
}

// Opt-out: cache by default, skip when the NoCache header is present
{
  behavior: CachingHeaders.Cache,
  store: CachingStore.PerModule, // class-based only; functional path falls back to Global
}
```

> **Note on `CachingStore.PerModule`:** the functional interceptor has no NgModule instance to own a per-module cache, so `PerModule` is treated as `Global` when using `p3xHttpCacheInterceptor`. The class-based `HttpCacheInterceptorInterceptor` still honours it via its per-instance cache.

## Example invocation in a component

With and without cache:

```ts
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';

import { CachingHeaders } from 'p3x-angular-http-cache-interceptor';

@Component({
  selector: 'p3x-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {
  private readonly http = inject(HttpClient);
  private readonly snack = inject(MatSnackBar);

  async loadCached() {
    try {
      const response: any = await firstValueFrom(
        this.http.get('https://network.corifeus.com/public/api/random/32'),
      );
      this.snack.open(`Will be always the same: ${response.random}`, 'OK');
    } catch (e) {
      this.snack.open(`Sorry, error happened, check the console for the error`, 'OK');
      console.error(e);
    }
  }

  async loadNonCached() {
    try {
      const response: any = await firstValueFrom(
        this.http.get('https://network.corifeus.com/public/api/random/32', {
          headers: { [CachingHeaders.NoCache]: '1' },
        }),
      );
      this.snack.open(`Truly random data: ${response.random}`, 'OK');
    } catch (e) {
      this.snack.open(`Sorry, error happened, check the console for the error`, 'OK');
      console.error(e);
    }
  }
}
```



[//]: #@corifeus-footer

---

# Corifeus Network

AI-powered network & email toolkit — free, no signup.

**Web** · [network.corifeus.com](https://network.corifeus.com)  **MCP** · [`npm i -g p3x-network-mcp`](https://www.npmjs.com/package/p3x-network-mcp)

- **AI Network Assistant** — ask in plain language, get a full domain health report
- **Network Audit** — DNS, SSL, security headers, DNSBL, BGP, IPv6, geolocation in one call
- **Diagnostics** — DNS lookup & global propagation, WHOIS, reverse DNS, HTTP check, my-IP
- **Mail Tester** — live SPF/DKIM/DMARC + spam score + AI fix suggestions, results emailed (localized)
- **Monitoring** — TCP / HTTP / Ping with alerts and public status pages
- **MCP server** — 17 tools exposed to Claude Code, Codex, Cursor, any MCP client
- **Install** — `claude mcp add p3x-network -- npx p3x-network-mcp`
- **Try** — *"audit example.com"*, *"why do my emails land in spam? test me@example.com"*
- **Source** — [patrikx3/network](https://github.com/patrikx3/network) · [patrikx3/network-mcp](https://github.com/patrikx3/network-mcp)
- **Contact** — [patrikx3.com](https://www.patrikx3.com/en/front/contact) · [donate](https://paypal.me/patrikx3)

---

## ❤️ Support Our Open-Source Project  
If you appreciate our work, consider ⭐ starring this repository or 💰 making a donation to support server maintenance and ongoing development. Your support means the world to us—thank you!  

---

### 🌍 About My Domains  
All my domains, including [patrikx3.com](https://patrikx3.com), [corifeus.eu](https://corifeus.eu), and [corifeus.com](https://corifeus.com), are developed in my spare time. While you may encounter minor errors, the sites are generally stable and fully functional.  

---

### 📈 Versioning Policy  
**Version Structure:** We follow a **Major.Minor.Patch** versioning scheme:  
- **Major:** 📅 Corresponds to the current year.  
- **Minor:** 🌓 Set as 4 for releases from January to June, and 10 for July to December.  
- **Patch:** 🔧 Incremental, updated with each build.  

**🚨 Important Changes:** Any breaking changes are prominently noted in the readme to keep you informed.


[**P3X-ANGULAR-HTTP-CACHE-INTERCEPTOR**](https://corifeus.com/angular-http-cache-interceptor) Build v2026.4.102

 [![NPM](https://img.shields.io/npm/v/p3x-angular-http-cache-interceptor.svg)](https://www.npmjs.com/package/p3x-angular-http-cache-interceptor)  [![Donate for PatrikX3 / P3X](https://img.shields.io/badge/Donate-PatrikX3-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)





[//]: #@corifeus-footer:end
