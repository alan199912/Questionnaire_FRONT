import { QuestionnaireResponse } from '../../../../interfaces/questionnaire.interface';
import { QuestionnaireService } from '../../../../services/questionnaire/questionnaire.service';
import { Component, OnInit } from '@angular/core';
import { Questionnaire } from 'src/app/interfaces/questionnaire.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-questionnaires',
  templateUrl: './list-questionnaires.component.html',
  styleUrls: ['./list-questionnaires.component.scss'],
})
export class ListQuestionnairesComponent implements OnInit {
  public listQuestionnaire: Questionnaire[];
  public isLoading = false;

  constructor(
    private readonly questionnairesService: QuestionnaireService,
    private readonly authService: AuthService,
    private readonly toastService: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadListQuestionnaire();
  }

  private async loadListQuestionnaire(): Promise<void> {
    this.isLoading = true;
    const id: string = await this.authService.getIdByToken().toPromise();
    this.listQuestionnaire = await this.questionnairesService
      .getQuestionnaireByIdUser(id)
      .toPromise();
    this.isLoading = false;
    console.log(this.listQuestionnaire);
  }

  public async deleteQuestionnaire(id: string): Promise<void> {
    try {
      this.isLoading = true;
      const response: QuestionnaireResponse = await this.questionnairesService
        .deleteQuestionnaire(id)
        .toPromise();
      this.toastService.success(response.message, 'Questionnaire');
      this.loadListQuestionnaire();
      this.isLoading = false;
    } catch (error) {
      this.toastService.error('Error to delete the questionnaire', 'ERROR');
    }
  }
}
