import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListQuestionnairesComponent } from './questionnaires/list-questionnaires/list-questionnaires.component';
import { QuestionnaireFormComponent } from './questionnaires/questionnaire-form/questionnaire-form.component';
import { AddQuestionsComponent } from './questionnaires/add-questions/add-questions.component';
import { ListQuestionsComponent } from './questionnaires/add-questions/components/list-questions/list-questions.component';
import { QuestionnaireInfoComponent } from './questionnaires/questionnaire-info/questionnaire-info.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ListQuestionnairesComponent,
    QuestionnaireFormComponent,
    AddQuestionsComponent,
    ListQuestionsComponent,
    QuestionnaireInfoComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
