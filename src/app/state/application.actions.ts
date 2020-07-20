import { Action } from '@ngrx/store';

export enum AppActionTypes {
  LogoutUser = '[Header Update] Logout current user',
}

export class LogoutUser implements Action {
  readonly type = AppActionTypes.LogoutUser;
  constructor() {}
}

export type AppAction = LogoutUser;
