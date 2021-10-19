import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Questionnaire } from 'src/app/interfaces/questionnaire.interface';
import { QuestionnaireService } from 'src/app/services/questionnaire/questionnaire.service';

@Component({
  selector: 'app-questionnaire-info',
  templateUrl: './questionnaire-info.component.html',
  styleUrls: ['./questionnaire-info.component.scss'],
})
export class QuestionnaireInfoComponent implements OnInit, OnDestroy {
  public questionnaire: Questionnaire;
  public isLoading = false;
  public onDestroy$: Subject<void> = new Subject();

  constructor(
    private readonly questionnaireService: QuestionnaireService,
    private readonly activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getQuestionnaireById(this.activatedRouter.snapshot.params.id);
  }

  public getQuestionnaireById(id: string): void {
    this.isLoading = true;

    this.questionnaireService
      .getQuestionnaireById(id)
      .pipe(takeUntil(this.onDestroy$.asObservable()))
      .subscribe((questionnaire) => {
        this.questionnaire = questionnaire;
        this.isLoading = false;
        console.log(this.questionnaire);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }
}
