import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeForm } from './atividade-form';

describe('AtividadeForm', () => {
  let component: AtividadeForm;
  let fixture: ComponentFixture<AtividadeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtividadeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtividadeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
