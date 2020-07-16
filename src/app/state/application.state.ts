import { IHeaderState } from './../shared/interfaces/header';
import { IUser } from './../shared/interfaces/user';

export interface IApplicationState {
  header?: IHeaderState;
  user?: IUser;
}
