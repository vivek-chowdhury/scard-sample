import { IUserError } from './../../shared/interfaces/error';
import { BaseService } from './base.service';
import { environment } from './../../../environments/environment';
import { IUser } from './../../shared/interfaces/user';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * @description This function is responsible for sending user credention for validation.
   *
   * @param userId Contains user id
   * @return Observable<IUser>
   */
  public validateUser(userId: string): Observable<IUser | IUserError> {
    return this.http
      .get<IUser[]>(environment.baseUrl + `/users?username=${userId}`)
      .pipe(
        tap((data) => console.log('User validated from server !')),
        map((response) => {
          if (response && response.length > 0) {
            return response[0];
          } else {
            return { error: 'Invalid user', code: 404 };
          }
        }),
        catchError((error) => {
          return this.handleError(error);
        })
      );
  }
}
