import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwSliderMenuComponent } from './sw-slider-menu.component';

describe('SwSliderMenuComponent', () => {
  let component: SwSliderMenuComponent;
  let fixture: ComponentFixture<SwSliderMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwSliderMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwSliderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
