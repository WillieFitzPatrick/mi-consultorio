import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesListDataComponent } from './pacientes-list-data.component';

describe('PacientesListDataComponent', () => {
  let component: PacientesListDataComponent;
  let fixture: ComponentFixture<PacientesListDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientesListDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesListDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
