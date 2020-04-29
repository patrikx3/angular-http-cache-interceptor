import { TestBed } from '@angular/core/testing';

import { AngularHttpCacheInterceptorService } from './angular-http-cache-interceptor.service';

describe('AngularHttpCacheInterceptorService', () => {
  let service: AngularHttpCacheInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularHttpCacheInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
