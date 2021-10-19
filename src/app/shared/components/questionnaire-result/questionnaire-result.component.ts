import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResultQuestionnaire } from 'src/app/interfaces/questionnaire.interface';
import { Subject } from 'rxjs';
import { AnswerService } from 'src/app/services/answer/answer.service';

@Component({
  selector: 'app-questionnaire-result',
  templateUrl: './questionnaire-result.component.html',
  styleUrls: ['./questionnaire-result.component.scss'],
})
export class QuestionnaireResultComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public answer: ResultQuestionnaire;
  public onDestroy$: Subject<void> = new Subject();

  constructor(
    private readonly answerService: AnswerService,
    private readonly activatedRouter: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getAnswerById(this.activatedRouter.snapshot.params.id);
  }

  private getAnswerById(id: string): void {
    this.isLoading = true;

    this.answerService
      .getAnswerById(id)
      .pipe(takeUntil(this.onDestroy$.asObservable()))
      .subscribe(
        (answer) => {
          this.answer = answer;
          console.log(this.answer);
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.router.navigate(['/']);
        }
      );
  }

  public back(): void {
    if (this.activatedRouter.snapshot.params.boolean === 'true') {
      this.router.navigate(['/']);
      return;
    }
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy(): void {
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }
}
