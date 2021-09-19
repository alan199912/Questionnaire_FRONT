import { QuestionnaireService } from 'src/app/services/questionnaire/questionnaire.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireInfoGuard implements CanActivate {
  constructor(
    private readonly questionnaireService: QuestionnaireService,
    private readonly router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.questionnaireService.questionnaire) {
      return this.router.navigate(['/dashboard']);
    }
    return true;
  }
}
