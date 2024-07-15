import {Inject, Injectable, Optional} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import {Observable, of} from 'rxjs';

import * as hash from 'object-hash'
import {tap} from "rxjs/operators";

import {CachingHeaders} from "./caching-headers.enum";
import {CachingStore} from "./caching-store.enum";

import {P3X_HTTP_CACHE_CONFIG} from "./http-cache-config.token";
import {HttpCacheConfig} from "./http-cache-config";


const hashOptions = {
  algorithm: 'md5',
  encoding: 'hex'
}

const globalCache =  new Map<string, any>()

@Injectable()
export class HttpCacheInterceptorInterceptor implements HttpInterceptor {

  private cachedData  =  new Map<string, any>()

  httpCacheConfig : HttpCacheConfig = {
    behavior: CachingHeaders.Cache,
    store: CachingStore.Global,
  }

  getCache(key: string) {
    if (this.httpCacheConfig.store === CachingStore.Global) {
      return globalCache.get(key)
    } else {
      return this.cachedData.get(key)
    }
  }

  setCache(key: string, value: any) {
    if (this.httpCacheConfig.store === CachingStore.Global) {
      globalCache.set(key, value)
    } else {
      this.cachedData.set(key, value)
    }
  }

  constructor(@Inject(P3X_HTTP_CACHE_CONFIG) @Optional() httpCacheConfigToken: HttpCacheConfig) {
    if (httpCacheConfigToken) {
      this.httpCacheConfig = httpCacheConfigToken
    }
  }

  httpToKey(httpRequest: HttpRequest<any>) {
    const body = JSON.parse(JSON.stringify(httpRequest.body))
    const key = httpRequest.method + '@' + httpRequest.urlWithParams + '@' + hash(httpRequest.params, hashOptions) + '@' + hash(body, hashOptions)
    return key
  }

  intercept(httpRequest: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    //console.log(httpRequest)
    //console.log('has', httpRequest.headers.has(CachingHeaders.NoCache))
    //console.log('value', httpRequest.headers.get(CachingHeaders.NoCache))

    const forcedCache = httpRequest.headers.get(CachingHeaders.Cache) !== null
    const forcedNoneCache = httpRequest.headers.get(CachingHeaders.NoCache) !== null

    //console.log('forcedCache', forcedCache, 'forcedNoneCache', forcedNoneCache)

    let headers = httpRequest.headers.delete(CachingHeaders.NoCache)
    headers = headers.delete(CachingHeaders.Cache)
    httpRequest = httpRequest.clone({
      headers: headers
    })

    if (forcedCache && forcedNoneCache) {
      throw new Error('You cannot use cache and non-cache header at once!')
    } else if (forcedNoneCache || (this.httpCacheConfig.behavior === CachingHeaders.NoCache && !forcedCache)) {
      return next.handle(httpRequest);
    } else if (forcedCache || (this.httpCacheConfig.behavior === CachingHeaders.Cache && !forcedNoneCache)) {
      // Checked if there is cached data for this URI
      const key = this.httpToKey(httpRequest)
      const lastResponse = this.getCache(key);
      if (lastResponse) {
        // In case of parallel requests to same URI,
        // return the request already in progress
        // otherwise return the last cached data

        //console.info('http cache interceptor hit cache', key)

        return (lastResponse instanceof Observable)
          ? lastResponse : of(lastResponse.clone());
      }

      //console.info('http cache interceptor', key)

      // If the request of going through for first time
      // then let the request proceed and cache the response
      const requestHandle = next.handle(httpRequest).pipe(
        tap((stateEvent: any) => {
          if (stateEvent instanceof HttpResponse) {
            this.setCache(
              key,
              stateEvent.clone()
            );
          }
        })
      )

      // Meanwhile cache the request Observable to handle parallel request
      //this.cachedData.set(key, requestHandle);

      return requestHandle;
    } else {
      console.error(this.httpCacheConfig)
      console.error(httpRequest.headers)
      throw new Error('There is a configuration in your setup')
    }

    /*
    // Also leave scope of resetting already cached data for a URI
    if (httpRequest.headers.get("reset-cache")) {
      this.cachedData.delete(httpRequest.urlWithParams);
    }
     */


  }
}
