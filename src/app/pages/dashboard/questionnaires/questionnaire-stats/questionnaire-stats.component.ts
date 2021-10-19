import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultQuestionnaire } from 'src/app/interfaces/questionnaire.interface';
import { takeUntil } from 'rxjs/operators';
import { AnswerService } from 'src/app/services/answer/answer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-questionnaire-stats',
  templateUrl: './questionnaire-stats.component.html',
  styleUrls: ['./questionnaire-stats.component.scss'],
})
export class QuestionnaireStatsComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public answers: ResultQuestionnaire;
  public onDestroy$: Subject<void> = new Subject();

  constructor(
    private readonly activatedRouter: ActivatedRoute,
    private readonly answerService: AnswerService,
    private readonly toastService: ToastrService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.activatedRouter.snapshot.params.id);
    this.getAnswerByIdQuestionnaire(this.activatedRouter.snapshot.params.id);
  }

  public getAnswerByIdQuestionnaire(id: string): void {
    this.isLoading = true;
    this.answerService
      .getAnswerByIdQuestionnaire(id)
      .pipe(takeUntil(this.onDestroy$.asObservable()))
      .subscribe((answers) => {
        this.answers = answers;
        console.log(this.answers);
        this.isLoading = false;
      });
  }

  public showResults(id: string): void {
    this.router.navigate([`/dashboard/result-user-admin/${id}/${false}`]);
  }

  public deleteAnswer(id: string): void {
    this.isLoading = true;
    this.answerService
      .deleteAnswer(id)
      .pipe(takeUntil(this.onDestroy$.asObservable()))
      .subscribe(
        (res) => {
          this.toastService.success(res.message, 'Answer');
          this.getAnswerByIdQuestionnaire(
            this.activatedRouter.snapshot.params.id
          );
          this.isLoading = false;
        },
        (error) => this.toastService.error(error, 'ERROR')
      );
  }

  ngOnDestroy(): void {
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }
}
