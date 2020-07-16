import { Action } from '@ngrx/store';

import { IUserError } from './../../shared/interfaces/error';
import { IUser } from './../../shared/interfaces/user';

export enum LoginActionTypes {
  ValidateUser = '[LOGIN API] Validating User credential',
  ValidateUserFailed = '[LOGIN API] User Validation Failed',
  ToggleRememberMe = '[LOGIN] Toggle Remember me Check box',
  SaveUserCredential = '[LOGIN VALIDATED] Saving user credential',
}

export class ValidateUser implements Action {
  readonly type = LoginActionTypes.ValidateUser;
  constructor(public user: IUser) {}
}

export class ValidateUserFailed implements Action {
  readonly type = LoginActionTypes.ValidateUserFailed;
  constructor(public error: IUserError) {}
}

export class ToggleRememberMe implements Action {
  readonly type = LoginActionTypes.ToggleRememberMe;
  constructor(public payload: boolean) {}
}

export class SaveUserCredential implements Action {
  readonly type = LoginActionTypes.SaveUserCredential;
  constructor(public user: IUser) {}
}

export type LoginAction =
  | ToggleRememberMe
  | SaveUserCredential
  | ValidateUserFailed;
