import { TestBed } from '@angular/core/testing';

import { QuestionnaireGuard } from './questionnaire.guard';

describe('QuestionnaireGuard', () => {
  let guard: QuestionnaireGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QuestionnaireGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
