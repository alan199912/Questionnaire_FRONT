import { Questionnaire } from 'src/app/interfaces/questionnaire.interface';
import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from 'src/app/services/questionnaire/questionnaire.service';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss'],
})
export class CodesComponent implements OnInit {
  public questionnaires: Questionnaire[];

  constructor(private readonly questionService: QuestionnaireService) {}

  ngOnInit(): void {
    this.getAllQuestionnaires();
  }

  private async getAllQuestionnaires(): Promise<void> {
    this.questionnaires = await this.questionService
      .getAllQuestionnaires()
      .toPromise();

    console.log(this.questionnaires);
  }
}
