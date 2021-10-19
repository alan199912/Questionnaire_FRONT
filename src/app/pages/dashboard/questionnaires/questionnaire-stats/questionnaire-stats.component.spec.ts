import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireStatsComponent } from './questionnaire-stats.component';

describe('QuestionnaireStatsComponent', () => {
  let component: QuestionnaireStatsComponent;
  let fixture: ComponentFixture<QuestionnaireStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
