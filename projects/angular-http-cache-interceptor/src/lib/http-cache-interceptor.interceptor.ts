import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';

import * as hash from 'object-hash'
import {tap} from "rxjs/operators";

import { CachingHeaders } from "./caching-headers.enum";

const hashOptions = {
  algorithm: 'md5',
  encoding: 'hex'
}

@Injectable()
export class HttpCacheInterceptorInterceptor implements HttpInterceptor {

  private cachedData = new Map<string, any>();

  constructor() {}

  httpToKey(httpRequest: HttpRequest<any>) {
    //console.time('httpToKey')
    const key = httpRequest.method + '@' + httpRequest.urlWithParams + '@' + hash(httpRequest.params, hashOptions) + '@' + hash(httpRequest.body, hashOptions)
    //console.timeEnd('httpToKey')
    return key
  }

  intercept(httpRequest: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //console.log(httpRequest)
    //console.log('has', httpRequest.headers.has(CachingHeaders.NoCache))
    //console.log('value', httpRequest.headers.get(CachingHeaders.NoCache))

    if (httpRequest.headers.get(CachingHeaders.NoCache) !== null) {
      //console.log('using cache')
      const headers = httpRequest.headers.delete(CachingHeaders.NoCache)
      const newRequest = httpRequest.clone({
        headers: headers
      })
      return next.handle(newRequest);
    }

    /*
    // Also leave scope of resetting already cached data for a URI
    if (httpRequest.headers.get("reset-cache")) {
      this.cachedData.delete(httpRequest.urlWithParams);
    }
     */

    // Checked if there is cached data for this URI
    const key = this.httpToKey(httpRequest)
    const lastResponse = this.cachedData.get(key);
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
          this.cachedData.set(
            key,
            stateEvent.clone()
          );
        }
      })
    )

    // Meanwhile cache the request Observable to handle parallel request
    //this.cachedData.set(key, requestHandle);

    return requestHandle;
  }
}
