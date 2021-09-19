import { QuestionnaireInfoGuard } from './guard/questionnaire-info/questionnaire-info.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { CodesComponent } from './components/codes/codes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'codes', component: CodesComponent },
  {
    path: 'user',
    loadChildren: () =>
      import('./components/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'play',
    loadChildren: () =>
      import('./components/play/play.module').then((m) => m.PlayModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
