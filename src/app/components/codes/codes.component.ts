import { Questionnaire } from 'src/app/interfaces/questionnaire.interface';
import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from 'src/app/services/questionnaire/questionnaire.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss'],
})
export class CodesComponent implements OnInit {
  public questionnaires: Questionnaire[];
  public onDestroy$: Subject<void> = new Subject();

  constructor(private readonly questionService: QuestionnaireService) {}

  ngOnInit(): void {
    this.getAllQuestionnaires();
  }

  private getAllQuestionnaires(): void {
    this.questionService
      .getAllQuestionnaires()
      .pipe(takeUntil(this.onDestroy$.asObservable()))
      .subscribe((questionnaire) => {
        this.questionnaires = questionnaire;
        console.log(this.questionnaires);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }
}
