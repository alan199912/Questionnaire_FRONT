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
export class ListQuestionsComponent implements OnChanges {
  public listQuestions: QuestionData[] = [];
  public isLoading = false;

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

  public async finishQuestionnaire(): Promise<void> {
    this.isLoading = true;
    const id = await this.authService.getIdByToken().toPromise();

    const questionnaire: Questionnaire = {
      idUser: id,
      title: this.questionnaireService.questionnaireData.title,
      description: this.questionnaireService.questionnaireData.description,
      code: this.generateCode(),
      numberQuestions: this.listQuestions.length,
      questionData: this.listQuestions,
      createdAt: new Date(),
    };

    try {
      await this.questionnaireService
        .createQuestionnaire(questionnaire)
        .toPromise();
      this.toastr.success(
        'Questionnaire created successfully',
        'Questionnaire'
      );
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.isLoading = false;
      this.toastr.success('Error to create the Questionnaire', 'ERROR');
    }
  }

  private generateCode(): string {
    return nanoid(6).toLocaleUpperCase();
  }
}
