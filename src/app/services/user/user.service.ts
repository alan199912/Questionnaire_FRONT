import { ResponseData, UserData } from '../../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  get token(): string {
    return localStorage.getItem('TOKEN') || '';
  }

  constructor(private readonly http: HttpClient) {}

  public getUserById(id: string): Observable<UserData> {
    return this.http
      .get<UserData>(`${environment.user.getUserById}/${id}`, {
        headers: { token: this.token },
      })
      .pipe(catchError((error) => throwError(error.error.message)));
  }

  public updatePassword(
    id: string,
    password: string,
    token?: string
  ): Observable<string> {
    return this.http
      .post<ResponseData>(
        `${environment.user.updatePassword}/${id}`,
        { password },
        {
          headers: { token: token ? token : this.token },
        }
      )
      .pipe(
        map(({ message }) => message),
        catchError((error) => throwError(error.error.message))
      );
  }
}
