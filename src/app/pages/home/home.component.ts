import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Questionnaire } from './../../interfaces/questionnaire.interface';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionnaireService } from 'src/app/services/questionnaire/questionnaire.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  public isErrorPIN = false;
  public pin: string;
  public isLoading = false;
  public onDestroy$: Subject<void> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly questionnaireService: QuestionnaireService,
    private readonly toastService: ToastrService
  ) {}

  public EnterCode(): void {
    if (!this.pin || this.pin === '') {
      this.isErrorPIN = true;

      setTimeout(() => {
        this.isErrorPIN = false;
      }, 3000);
      return;
    }

    this.isLoading = true;

    this.questionnaireService
      .getQuestionnaireByCode(this.pin)
      .pipe(takeUntil(this.onDestroy$.asObservable()))
      .subscribe(
        (questionnaire: Questionnaire) => {
          this.questionnaireService.questionnaire = questionnaire;
          this.isLoading = false;
          this.router.navigate(['/play/enter-name']);
        },
        (error) => {
          this.isLoading = false;
          this.toastService.error(error, 'ERROR');
        }
      );
  }

  ngOnDestroy(): void {
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }
}
