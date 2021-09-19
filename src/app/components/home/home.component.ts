import { Questionnaire } from './../../interfaces/questionnaire.interface';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionnaireService } from 'src/app/services/questionnaire/questionnaire.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public isErrorPIN = false;
  public pin: string;
  public isLoading = false;

  constructor(
    private readonly router: Router,
    private readonly questionnaireService: QuestionnaireService,
    private readonly toastService: ToastrService
  ) {}

  public async EnterCode(): Promise<void> {
    if (!this.pin || this.pin === '') {
      this.isErrorPIN = true;

      setTimeout(() => {
        this.isErrorPIN = false;
      }, 3000);
      return;
    }

    try {
      this.isLoading = true;
      const questionnaire: Questionnaire = await this.questionnaireService
        .getQuestionnaireByCode(this.pin)
        .toPromise();

      this.questionnaireService.questionnaire = questionnaire;
      this.isLoading = false;
      this.router.navigate(['/play/enter-name']);
    } catch (error) {
      this.isLoading = false;
      this.toastService.error(error.error.message, 'ERROR');
    }
  }
}
