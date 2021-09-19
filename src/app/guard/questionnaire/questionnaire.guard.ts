import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionnaireService } from 'src/app/services/questionnaire/questionnaire.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireGuard implements CanActivate, CanLoad {
  constructor(
    private readonly router: Router,
    private readonly questionnaireService: QuestionnaireService
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.questionnaireService.questionnaireData) {
      return this.router.navigate(['/dashboard']);
    }
    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.questionnaireService.questionnaireData) {
      return this.router.navigate(['/dashboard']);
    }
    return true;
  }
}
