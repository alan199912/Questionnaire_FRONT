import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  LoginUser,
  ResponseData,
  ResponseId,
} from 'src/app/interfaces/auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get token(): string {
    return localStorage.getItem('TOKEN') || '';
  }

  constructor(private readonly http: HttpClient) {}

  public registerUser(
    email: string,
    username: string,
    password: string
  ): Observable<ResponseData> {
    const bodyUser = {
      email,
      username,
      password,
    };
    return this.http
      .post<ResponseData>(environment.auth.registerUser, bodyUser)
      .pipe(catchError((error) => throwError(error.error.message)));
  }

  public loginUser(email: string, password: string): Observable<LoginUser> {
    const bodyUser = {
      email,
      password,
    };
    return this.http
      .post<LoginUser>(environment.auth.loginUser, bodyUser)
      .pipe(catchError((error) => throwError(error.error.message)));
  }

  public verifyToken = (): Observable<boolean> => {
    return this.http
      .get(environment.auth.renewToken, { headers: { token: this.token } })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  };

  public getIdByToken(): Observable<string> {
    return this.http
      .get<ResponseId>(environment.auth.getIdByToken, {
        headers: { token: this.token },
      })
      .pipe(
        map(({ id }) => id),
        catchError((error) => throwError(error.error.message))
      );
  }

  public recoveryPassword(email: string): Observable<string> {
    const body = {
      email,
    };

    return this.http
      .post<ResponseData>(environment.auth.recoveryPassword, body)
      .pipe(
        map(({ message }) => message),
        catchError((error) => throwError(error.error.message))
      );
  }
}
