import { environment } from './../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import {
  Questionnaire,
  QuestionnaireData,
  QuestionnairesResponseData,
  QuestionnaireResponse,
  QuestionnaireResponseDataInfo,
  AllResultQuestionnaireResponse,
} from './../../interfaces/questionnaire.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  public questionnaire: Questionnaire;
  public participantUserName: string;
  public questionnaireData: QuestionnaireData;

  get token(): string {
    return localStorage.getItem('TOKEN') || '';
  }

  constructor(private readonly http: HttpClient) {}

  public createQuestionnaire(
    questionnaireData: Questionnaire
  ): Observable<Questionnaire> {
    return this.http
      .post<QuestionnaireResponseDataInfo>(
        environment.questionnaire.createQuestionnaire,
        questionnaireData,
        { headers: { token: this.token } }
      )
      .pipe(
        map(({ questionnaire }) => questionnaire),
        catchError((error) => throwError(error.error.message))
      );
  }

  public getQuestionnaireByIdUser(id: string): Observable<Questionnaire[]> {
    return this.http
      .get<QuestionnairesResponseData>(
        `${environment.questionnaire.getQuestionnaireByIdUser}/${id}`,
        { headers: { token: this.token } }
      )
      .pipe(
        map(({ questionnaire }) => [...questionnaire]),
        catchError((error) => throwError(error.error.message))
      );
  }

  public deleteQuestionnaire(id: string): Observable<QuestionnaireResponse> {
    return this.http
      .delete<QuestionnaireResponse>(
        `${environment.questionnaire.deleteQuestionnaire}/${id}`,
        { headers: { token: this.token } }
      )
      .pipe(catchError((error) => throwError(error.error.message)));
  }

  public getQuestionnaireById(id: string): Observable<Questionnaire> {
    return this.http
      .get<QuestionnaireResponseDataInfo>(
        `${environment.questionnaire.getQuestionnaireById}/${id}`,
        { headers: { token: this.token } }
      )
      .pipe(
        map(({ questionnaire }) => questionnaire),
        catchError((error) => throwError(error.error.message))
      );
  }

  public getQuestionnaireByCode(code: string): Observable<Questionnaire> {
    const body = {
      code,
    };
    return this.http
      .post<QuestionnaireResponseDataInfo>(
        environment.questionnaire.getQuestionnaireByCode,
        body
      )
      .pipe(
        map(({ questionnaire }) => questionnaire),
        catchError((error) => throwError(error.error.message))
      );
  }

  public getAllQuestionnaires(): Observable<Questionnaire[]> {
    return this.http
      .get<AllResultQuestionnaireResponse>(
        environment.questionnaire.getAllQuestionnaires
      )
      .pipe(
        map(({ questionnaire }) => questionnaire),
        catchError((error) => throwError(error.error.message))
      );
  }
}
