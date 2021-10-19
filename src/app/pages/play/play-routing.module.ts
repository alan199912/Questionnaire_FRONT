import { PlayQuestionnaireComponent } from './play-questionnaire/play-questionnaire.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterNameComponent } from './enter-name/enter-name.component';
import { InitialCounterComponent } from './initial-counter/initial-counter.component';
import { QuestionnaireInfoGuard } from 'src/app/guard/questionnaire-info/questionnaire-info.guard';
import { UserInfoGuard } from 'src/app/guard/user-info/user-info.guard';
import { QuestionnaireResultComponent } from '../../shared/components/questionnaire-result/questionnaire-result.component';

const routes: Routes = [
  {
    path: 'enter-name',
    canActivate: [QuestionnaireInfoGuard],
    component: EnterNameComponent,
  },
  {
    path: 'initial-counter',
    canActivate: [QuestionnaireInfoGuard, UserInfoGuard],
    component: InitialCounterComponent,
  },
  {
    path: 'play-questionnaire',
    canActivate: [QuestionnaireInfoGuard, UserInfoGuard],
    component: PlayQuestionnaireComponent,
  },
  {
    path: 'result-questionnaire/:id/:boolean',
    component: QuestionnaireResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayRoutingModule {}
