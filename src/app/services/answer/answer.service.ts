import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AnswerResponse } from 'src/app/interfaces/answer.interface';
import {
  ResultQuestionnaire,
  ResultQuestionnaireResponse,
} from 'src/app/interfaces/questionnaire.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  get token(): string {
    return localStorage.getItem('TOKEN') || '';
  }

  constructor(private readonly http: HttpClient) {}

  public getAnswerById(id: string): Observable<ResultQuestionnaire> {
    return this.http
      .get<ResultQuestionnaireResponse>(
        `${environment.questionnaire.getAnswerById}/${id}`
      )
      .pipe(
        map(({ answer }) => answer),
        catchError((error) => throwError(error.error.message))
      );
  }

  public getAnswerByIdCatchError(id: string): Observable<AnswerResponse> {
    return this.http
      .get<AnswerResponse>(`${environment.questionnaire.getAnswerById}/${id}`)
      .pipe(catchError((error) => throwError(error.error.message)));
  }

  public saveResultByUser(
    resultQuestionnaire
  ): Observable<ResultQuestionnaire> {
    return this.http
      .post<ResultQuestionnaireResponse>(
        environment.questionnaire.saveResultByUser,
        resultQuestionnaire
      )
      .pipe(
        map(({ answer }) => answer),
        catchError((error) => throwError(error.error.message))
      );
  }

  public getAnswerByIdQuestionnaire(
    id: string
  ): Observable<ResultQuestionnaire> {
    return this.http
      .get<ResultQuestionnaireResponse>(
        `${environment.questionnaire.getAnswerByIdQuestionnaire}/${id}`,
        { headers: { token: this.token } }
      )
      .pipe(
        map(({ answer }) => answer),
        catchError((error) => throwError(error.error.message))
      );
  }

  public deleteAnswer(id: string): Observable<AnswerResponse> {
    return this.http
      .delete<AnswerResponse>(
        `${environment.questionnaire.deleteAnswer}/${id}`,
        { headers: { token: this.token } }
      )
      .pipe(catchError((error) => throwError(error.error.message)));
  }
}
