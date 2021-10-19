import { QuestionData } from './../../../../interfaces/questionnaire.interface';

import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionnaireService } from 'src/app/services/questionnaire/questionnaire.service';
import { ListAnswer } from 'src/app/interfaces/answer.interface';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss'],
})
export class AddQuestionsComponent implements AfterViewChecked {
  public questionForm: FormGroup;
  public isShowErrorForm = false;
  public arrayAnswer = ['answer1', 'answer2', 'answer3', 'answer4'];
  public question: QuestionData;
  public isEndQuestionnaire = false;

  get getSeconds(): number {
    return this.questionForm.get('seconds')?.value;
  }

  get getScore(): number {
    return this.questionForm.get('score')?.value;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly cdRef: ChangeDetectorRef,
    private readonly questionnaireService: QuestionnaireService
  ) {
    this.questionForm = this.fb.group({
      title: ['', Validators.required],
      seconds: [
        10,
        [Validators.required, Validators.min(5), Validators.max(30)],
      ],
      score: [1000, Validators.required],
      answer1: this.fb.group({
        title: ['', Validators.required],
        isCorrect: [false, Validators.required],
      }),
      answer2: this.fb.group({
        title: ['', Validators.required],
        isCorrect: [false, Validators.required],
      }),
      answer3: this.fb.group({
        title: ['', Validators.required],
        isCorrect: [false, Validators.required],
      }),
      answer4: this.fb.group({
        title: ['', Validators.required],
        isCorrect: [false, Validators.required],
      }),
    });
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  public addQuestion(): void {
    if (
      this.questionForm.invalid ||
      this.incompleteCorrectAnswer().length === 0
    ) {
      this.isShowErrorForm = true;

      setTimeout(() => {
        this.isShowErrorForm = false;
      }, 3000);
      return;
    }

    const listAnswer: ListAnswer[] = this.arrayAnswer.map((answer) => ({
      title: this.questionForm.get(answer)?.get('title')?.value,
      isCorrect: this.questionForm.get(answer)?.get('isCorrect')?.value,
    }));

    this.question = {
      title: this.questionForm.get('title').value,
      seconds: this.questionForm.get('seconds').value,
      score: this.questionForm.get('score').value,
      listAnswer,
    };

    this.resetForm();
  }

  public countSeconds(getNumber: number): void {
    this.questionForm.patchValue({
      seconds: this.getSeconds + getNumber,
    });
  }

  public isCorrectAnswer(group: string): void {
    this.setCorrectAnswer(group);
    this.questionForm.get(group).patchValue({
      isCorrect: !this.getIsCorrectAnswer(group),
    });
  }

  public getIsCorrectAnswer(group: string): boolean {
    return this.questionForm.get(group)?.get('isCorrect')?.value;
  }

  private setCorrectAnswer(group: string): string[] {
    return this.arrayAnswer.filter(
      (answer: string) =>
        answer !== group &&
        this.questionForm.get(answer)?.patchValue({ isCorrect: false })
    );
  }

  private incompleteCorrectAnswer(): string[] {
    return this.arrayAnswer.filter(
      (answer: string) =>
        this.questionForm.get(answer)?.get('isCorrect')?.value === true
    );
  }

  private resetForm(): void {
    this.questionForm.patchValue({
      title: '',
      seconds: 10,
      score: 1000,
      answer1: {
        title: '',
        isCorrect: false,
      },
      answer2: {
        title: '',
        isCorrect: false,
      },
      answer3: {
        title: '',
        isCorrect: false,
      },
      answer4: {
        title: '',
        isCorrect: false,
      },
    });
  }

  public isEndQuestionnaireEmitted($event: boolean): void {
    this.isEndQuestionnaire = $event;
  }
}
