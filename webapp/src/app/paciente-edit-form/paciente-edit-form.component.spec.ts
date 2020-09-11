import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteEditFormComponent } from './paciente-edit-form.component';

describe('PacienteEditFormComponent', () => {
  let component: PacienteEditFormComponent;
  let fixture: ComponentFixture<PacienteEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
