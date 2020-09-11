import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaEditFormComponent } from './visita-edit-form.component';

describe('CitaEditFormComponent', () => {
  let component: CitaEditFormComponent;
  let fixture: ComponentFixture<CitaEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitaEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
