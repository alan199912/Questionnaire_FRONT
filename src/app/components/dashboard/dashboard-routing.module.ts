import { QuestionnaireGuard } from './../../guard/questionnaire/questionnaire.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionsComponent } from './questionnaires/add-questions/add-questions.component';
import { ListQuestionnairesComponent } from './questionnaires/list-questionnaires/list-questionnaires.component';
import { QuestionnaireFormComponent } from './questionnaires/questionnaire-form/questionnaire-form.component';
import { QuestionnaireInfoComponent } from './questionnaires/questionnaire-info/questionnaire-info.component';
import { QuestionnaireStatsComponent } from './questionnaires/questionnaire-stats/questionnaire-stats.component';
import { QuestionnaireResultComponent } from '../shared/questionnaire-result/questionnaire-result.component';

const routes: Routes = [
  { path: '', component: ListQuestionnairesComponent },
  { path: 'questionnaire-form', component: QuestionnaireFormComponent },
  { path: 'questionnaire-info/:id', component: QuestionnaireInfoComponent },
  { path: 'questionnaire-stats/:id', component: QuestionnaireStatsComponent },
  {
    path: 'add-questions',
    canActivate: [QuestionnaireGuard],
    canLoad: [QuestionnaireGuard],
    component: AddQuestionsComponent,
  },
  {
    path: 'result-user-admin/:id/:boolean',
    component: QuestionnaireResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
