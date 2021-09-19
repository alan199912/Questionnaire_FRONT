import { Router } from '@angular/router';
import {
  AnswerByUser,
  ListAnswer,
  Questionnaire,
  ResultQuestionnaire,
} from './../../../interfaces/questionnaire.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionnaireService } from 'src/app/services/questionnaire/questionnaire.service';
import { ToastrService } from 'ngx-toastr';

interface SelectedOption {
  answer: ListAnswer;
  index: number;
}

@Component({
  selector: 'app-play-questionnaire',
  templateUrl: './play-questionnaire.component.html',
  styleUrls: ['./play-questionnaire.component.scss'],
})
export class PlayQuestionnaireComponent implements OnInit, OnDestroy {
  public questionnaire: Questionnaire;
  private setInterval: ReturnType<typeof setTimeout>;
  public username: string;
  public indexQuestion = 0;
  public seconds = 0;
  public isLoading = false;
  public selectedOption: SelectedOption;
  public selectedtIndex: number;
  public numberCorrects = 0;
  public numberInCorrects = 0;
  public totalScore = 0;
  public listAnswerByUser: AnswerByUser[] = [];

  constructor(
    private readonly questionService: QuestionnaireService,
    private readonly router: Router,
    private readonly toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.questionnaire = this.questionService.questionnaire;
    this.username = this.questionService.participantUserName;
    this.initCounter();
  }

  public getSeconds(): number {
    return this.seconds;
  }

  public getTitle(): string {
    return this.questionnaire.questionData[this.indexQuestion].title;
  }

  private initCounter(): void {
    this.seconds = this.questionnaire.questionData[this.indexQuestion].seconds;

    this.setInterval = setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.nextQuestionBySeconds();
        return;
      }
    }, 1000);
  }

  public selectedOptionByUser(answer: ListAnswer, index: number): void {
    this.selectedOption = {
      answer,
      index,
    };
    console.log(this.selectedOption);
  }

  public addClassOptionSelected(answer: ListAnswer): string {
    if (answer === this.selectedOption?.answer) {
      return 'asnwer-selected';
    }
    return '';
  }

  public nextQuestionByButton(): void {
    clearInterval(this.setInterval);
    this.nextQuestionBySeconds();
    this.initCounter();
  }

  private nextQuestionBySeconds(): void {
    this.icrementIfIsCorrectOrInCorrect();

    this.selectedtIndex = this.selectedOption?.index;
    const asnwerByUser: AnswerByUser = {
      title: this.questionnaire.questionData[this.indexQuestion].title,
      getScore: this.getTotalScores(),
      seconds: this.getSecondsAnswer(),
      indexQuestion: this.getIndexSelectedByUser(),
      listAnswer:
        this.questionnaire.questionData[this.indexQuestion].listAnswer,
    };

    this.listAnswerByUser.push(asnwerByUser);
    this.selectedOption = null;

    if (this.questionnaire.questionData.length - 1 === this.indexQuestion) {
      this.saveUserResult();

      return;
    } else {
      this.indexQuestion++;
      this.seconds =
        this.questionnaire.questionData[this.indexQuestion].seconds;
    }
  }

  private getTotalScores(): number {
    if (!this.selectedOption || !this.selectedOption.answer.isCorrect) {
      return 0;
    }

    this.totalScore +=
      this.questionnaire.questionData[this.indexQuestion].score;

    return this.questionnaire.questionData[this.indexQuestion].score;
  }

  private getSecondsAnswer(): number | string {
    if (!this.selectedOption) {
      return 'DID NOT ANSWER';
    }

    return (
      this.questionnaire.questionData[this.indexQuestion].seconds - this.seconds
    );
  }

  private getIndexSelectedByUser(): number | string {
    if (!this.selectedOption) {
      return null;
    }

    return this.selectedtIndex;
  }

  private icrementIfIsCorrectOrInCorrect(): void {
    if (!this.selectedOption || !this.selectedOption.answer.isCorrect) {
      this.numberInCorrects++;
      return;
    }

    this.numberCorrects++;
  }

  private async saveUserResult(): Promise<void> {
    const resultQuestionnaire: ResultQuestionnaire = {
      idQuestionnaire: this.questionnaire._id,
      participantUserName: this.username,
      date: new Date(),
      corrects: this.numberCorrects,
      inCorrects: this.numberInCorrects,
      totalScore: this.totalScore,
      listAnswerByUser: this.listAnswerByUser,
    };

    try {
      const resultAnswer = await this.questionService
        .saveResultByUser(resultQuestionnaire)
        .toPromise();

      this.toastService.success(
        'Questionnaire completed successfully',
        'Questionnaire'
      );
      this.router.navigate([`/play/result-questionnaire/${resultAnswer._id}`]);
    } catch (error) {
      this.router.navigate(['/']);
      this.toastService.success(error.error.message, 'ERROR');
    }

    console.log(resultQuestionnaire);
  }

  ngOnDestroy(): void {
    clearInterval(this.setInterval);
  }
}
