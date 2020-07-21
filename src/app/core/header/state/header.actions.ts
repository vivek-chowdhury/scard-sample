import { IHeaderState } from './../../../shared/interfaces/header';
import { Action } from '@ngrx/store';

export enum HeaderActionTypes {
  UpdateHeaderButtonState = '[Header Update] Update Header buttons',
  GetProductByTitle = '[Header Search] Get Product list by search key',
}

export class UpdateHeaderButtonState implements Action {
  readonly type = HeaderActionTypes.UpdateHeaderButtonState;
  constructor(public state: IHeaderState) {}
}

export class GetProductByTitle implements Action {
  readonly type = HeaderActionTypes.GetProductByTitle;
  constructor(public key: string) {}
}

export type HeaderAction = UpdateHeaderButtonState | GetProductByTitle;
