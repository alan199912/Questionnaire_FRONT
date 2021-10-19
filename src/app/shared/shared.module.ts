import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { QuestionnaireResultComponent } from './components/questionnaire-result/questionnaire-result.component';

@NgModule({
  declarations: [SpinnerComponent, QuestionnaireResultComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule, SpinnerComponent],
})
export class SharedModule {}
