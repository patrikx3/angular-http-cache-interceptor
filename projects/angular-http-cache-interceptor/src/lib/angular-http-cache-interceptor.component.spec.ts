import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularHttpCacheInterceptorComponent } from './angular-http-cache-interceptor.component';

describe('AngularHttpCacheInterceptorComponent', () => {
  let component: AngularHttpCacheInterceptorComponent;
  let fixture: ComponentFixture<AngularHttpCacheInterceptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularHttpCacheInterceptorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularHttpCacheInterceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
