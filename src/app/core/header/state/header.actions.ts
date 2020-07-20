import { IHeaderState } from './../../../shared/interfaces/header';
import { Action } from '@ngrx/store';

export enum HeaderActionTypes {
  UpdateHeaderButtonState = '[Header Update] Update Header buttons',
}

export class UpdateHeaderButtonState implements Action {
  readonly type = HeaderActionTypes.UpdateHeaderButtonState;
  constructor(public state: IHeaderState) {}
}

export type HeaderAction = UpdateHeaderButtonState;
