import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionnaireService } from 'src/app/services/questionnaire/questionnaire.service';

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.scss'],
})
export class QuestionnaireFormComponent {
  public questionnaireForm: FormGroup;
  public isShowErrorForm = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly questionnaireService: QuestionnaireService
  ) {
    this.questionnaireForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  public createQuestionnaire(): void {
    if (this.questionnaireForm.invalid) {
      this.isShowErrorForm = true;

      setTimeout(() => {
        this.isShowErrorForm = false;
      }, 3000);
      return;
    }

    console.log({
      title: this.questionnaireForm.value.title,
      description: this.questionnaireForm.value.description,
    });

    this.questionnaireService.questionnaireData = {
      title: this.questionnaireForm.value.title,
      description: this.questionnaireForm.value.description,
    };

    this.router.navigate(['/dashboard/add-questions']);
  }
}
