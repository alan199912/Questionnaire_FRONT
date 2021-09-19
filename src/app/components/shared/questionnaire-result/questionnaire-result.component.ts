import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from 'src/app/services/questionnaire/questionnaire.service';
import { ResultQuestionnaire } from 'src/app/interfaces/questionnaire.interface';

@Component({
  selector: 'app-questionnaire-result',
  templateUrl: './questionnaire-result.component.html',
  styleUrls: ['./questionnaire-result.component.scss'],
})
export class QuestionnaireResultComponent implements OnInit {
  public isLoading = false;
  public answer: ResultQuestionnaire;

  constructor(
    private readonly questionnaireService: QuestionnaireService,
    private readonly activatedRouter: ActivatedRoute,
    private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.getAnswerById(this.activatedRouter.snapshot.params.id);
  }

  private async getAnswerById(id: string): Promise<void> {
    this.isLoading = true;

    try {
      this.answer = await this.questionnaireService
        .getAnswerById(id)
        .toPromise();
      console.log(this.answer);
      this.isLoading = false;
    } catch (error) {
      this.router.navigate(['/dashboard']);
    }
  }

  public back(): void {
    this.router.navigate(['/dashboard']);
  }
}
