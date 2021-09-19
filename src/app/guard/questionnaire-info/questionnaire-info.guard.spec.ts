import { TestBed } from '@angular/core/testing';

import { QuestionnaireInfoGuard } from './questionnaire-info.guard';

describe('QuestionnaireInfoGuard', () => {
  let guard: QuestionnaireInfoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QuestionnaireInfoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
