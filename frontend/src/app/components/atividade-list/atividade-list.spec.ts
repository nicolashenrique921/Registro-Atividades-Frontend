import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeList } from './atividade-list';

describe('AtividadeList', () => {
  let component: AtividadeList;
  let fixture: ComponentFixture<AtividadeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtividadeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtividadeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
