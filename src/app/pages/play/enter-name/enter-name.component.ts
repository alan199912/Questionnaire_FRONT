import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionnaireService } from 'src/app/services/questionnaire/questionnaire.service';

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.scss'],
})
export class EnterNameComponent {
  public isErrorUsername = false;
  public userName: string;

  constructor(
    private readonly questionnaireService: QuestionnaireService,
    private readonly router: Router
  ) {}

  public startToPlay(): void {
    if (!this.userName || this.userName === '') {
      this.isErrorUsername = true;

      setTimeout(() => {
        this.isErrorUsername = false;
      }, 3000);
      return;
    }
    console.log(this.userName);
    this.questionnaireService.participantUserName = this.userName;
    this.router.navigate(['/play/initial-counter']);
  }
}
