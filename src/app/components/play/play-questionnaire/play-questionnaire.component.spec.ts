import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayQuestionnaireComponent } from './play-questionnaire.component';

describe('PlayQuestionnaireComponent', () => {
  let component: PlayQuestionnaireComponent;
  let fixture: ComponentFixture<PlayQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayQuestionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
