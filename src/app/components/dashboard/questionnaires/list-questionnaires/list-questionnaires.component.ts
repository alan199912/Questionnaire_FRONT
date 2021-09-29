import { Subject } from 'rxjs';
import { QuestionnaireResponse } from '../../../../interfaces/questionnaire.interface';
import { QuestionnaireService } from '../../../../services/questionnaire/questionnaire.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Questionnaire } from 'src/app/interfaces/questionnaire.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { mergeMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list-questionnaires',
  templateUrl: './list-questionnaires.component.html',
  styleUrls: ['./list-questionnaires.component.scss'],
})
export class ListQuestionnairesComponent implements OnInit, OnDestroy {
  public listQuestionnaire: Questionnaire[];
  public isLoading = false;
  public onDestroy$: Subject<void> = new Subject();

  constructor(
    private readonly questionnairesService: QuestionnaireService,
    private readonly authService: AuthService,
    private readonly toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadListQuestionnaire();
  }

  private loadListQuestionnaire(): void {
    this.isLoading = true;

    this.authService
      .getIdByToken()
      .pipe(
        takeUntil(this.onDestroy$.asObservable()),
        mergeMap((id) => {
          return this.questionnairesService
            .getQuestionnaireByIdUser(id)
            .pipe(takeUntil(this.onDestroy$.asObservable()));
        })
      )
      .subscribe((questionnaire) => {
        this.listQuestionnaire = questionnaire;
        this.isLoading = false;
      });
  }

  public deleteQuestionnaire(id: string): void {
    this.isLoading = true;
    this.questionnairesService
      .deleteQuestionnaire(id)
      .pipe(takeUntil(this.onDestroy$.asObservable()))
      .subscribe(
        (response) => {
          this.toastService.success(response.message, 'Questionnaire');
          this.loadListQuestionnaire();
          this.isLoading = false;
        },
        (error) =>
          this.toastService.error('Error to delete the questionnaire', 'ERROR')
      );
  }

  ngOnDestroy(): void {
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }
}
