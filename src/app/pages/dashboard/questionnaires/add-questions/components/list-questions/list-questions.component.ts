import { takeUntil, mergeMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  QuestionData,
  Questionnaire,
} from './../../../../../../interfaces/questionnaire.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { QuestionnaireService } from 'src/app/services/questionnaire/questionnaire.service';
import { nanoid } from 'nanoid';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss'],
})
export class ListQuestionsComponent implements OnChanges, OnDestroy {
  public listQuestions: QuestionData[] = [];
  public isLoading = false;
  public onDestroy$: Subject<void> = new Subject();

  @Input() public question: QuestionData;
  @Output() public isEndQuestionnaire = new EventEmitter<boolean>();

  constructor(
    private readonly questionnaireService: QuestionnaireService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question.currentValue) {
      this.listQuestions.push(changes.question.currentValue);
    }

    if (this.listQuestions.length === 5) {
      this.isEndQuestionnaire.emit(true);
    }
  }

  public deleteQuestion(i: number): QuestionData[] {
    return this.listQuestions.splice(i, 1);
  }

  public finishQuestionnaire(): void {
    this.isLoading = true;

    this.authService
      .getIdByToken()
      .pipe(
        takeUntil(this.onDestroy$.asObservable()),
        mergeMap((id) => {
          const questionnaire: Questionnaire = {
            idUser: id,
            title: this.questionnaireService.questionnaireData.title,
            description:
              this.questionnaireService.questionnaireData.description,
            code: this.generateCode(),
            numberQuestions: this.listQuestions.length,
            questionData: this.listQuestions,
            createdAt: new Date(),
          };

          return this.questionnaireService
            .createQuestionnaire(questionnaire)
            .pipe(takeUntil(this.onDestroy$.asObservable()));
        })
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.toastr.success(
            'Questionnaire created successfully',
            'Questionnaire'
          );
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.isLoading = false;
          this.toastr.success('Error to create the Questionnaire', 'ERROR');
        }
      );
  }

  private generateCode(): string {
    return nanoid(6).toLocaleUpperCase();
  }

  ngOnDestroy(): void {
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }
}
