import { UserData } from './../../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  get token(): string {
    return localStorage.getItem('TOKEN') || '';
  }

  constructor(private readonly http: HttpClient) {}

  public getUserById(id: number): Observable<UserData> {
    return this.http.get<UserData>(environment.user.getUserById, {
      headers: { token: this.token },
    });
  }
}
