import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Questionnaire } from 'src/app/interfaces/questionnaire.interface';
import { QuestionnaireService } from 'src/app/services/questionnaire/questionnaire.service';

@Component({
  selector: 'app-questionnaire-info',
  templateUrl: './questionnaire-info.component.html',
  styleUrls: ['./questionnaire-info.component.scss'],
})
export class QuestionnaireInfoComponent implements OnInit {
  public questionnaire: Questionnaire;
  public isLoading = false;

  constructor(
    private readonly questionnaireService: QuestionnaireService,
    private readonly activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getQuestionnaireById(this.activatedRouter.snapshot.params.id);
  }

  public async getQuestionnaireById(id: string): Promise<void> {
    this.isLoading = true;

    try {
      this.questionnaire = await this.questionnaireService
        .getQuestionnaireById(id)
        .toPromise();
    } catch (error) {
      this.isLoading = false;
    }

    this.isLoading = false;
    console.log(this.questionnaire);
  }
}
