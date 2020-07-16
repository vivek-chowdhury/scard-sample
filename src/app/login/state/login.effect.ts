import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { IUserError } from './../../shared/interfaces/error';
import { IUser } from './../../shared/interfaces/user';
import { LoginService } from './../../core/services/login.service';
import * as LoginActions from './login.action';

@Injectable()
export class LoginEffects {
  constructor(private action$: Actions, private loginSevice: LoginService) {}

  @Effect()
  validateUser$: Observable<Action> = this.action$.pipe(
    ofType(LoginActions.LoginActionTypes.ValidateUser),
    map((action: LoginActions.ValidateUser) => {
      return action.user;
    }),
    mergeMap((user) =>
      this.loginSevice.validateUser(user.username).pipe(
        map((response: IUser) => {
          if (!response.error) {
            return new LoginActions.SaveUserCredential(response);
          } else {
            return new LoginActions.ValidateUserFailed(response as IUserError);
          }
        }),
        catchError((error) => {
          return of(new LoginActions.ValidateUserFailed(error));
        })
      )
    )
  );
}
