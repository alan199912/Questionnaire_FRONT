import { QuestionnaireInfoGuard } from './guard/questionnaire-info/questionnaire-info.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { CodesComponent } from './pages/codes/codes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'codes', component: CodesComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'play',
    loadChildren: () =>
      import('./pages/play/play.module').then((m) => m.PlayModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
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
