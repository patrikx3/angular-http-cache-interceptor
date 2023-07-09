import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DefaultComponentComponent } from './default-component.component';

describe('DefaultComponentComponent', () => {
  let component: DefaultComponentComponent;
  let fixture: ComponentFixture<DefaultComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [DefaultComponentComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
