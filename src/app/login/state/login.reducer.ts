import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IUserError } from './../../shared/interfaces/error';
import { IApplicationState } from './../../state/application.state';
import * as Actions from './login.action';

export interface ILoginState extends IApplicationState {
  rememberMe?: boolean;
  isLoggedIn?: boolean;
  error?: IUserError;
}

// Initial state of login
const intialLoginState: ILoginState = {
  user: null,
};

// Selector to retrive specific slice of state from store, here we are slicing state related to login.
const loginFeatireSelector = createFeatureSelector<ILoginState>('login');
export const loginSelector = createSelector(
  loginFeatireSelector,
  (currentState) => {
    return currentState; // Here we can manipulate slice and send that specific part to component.
  }
);

export function loginReducer(
  state: ILoginState = intialLoginState,
  action: Actions.LoginAction
): ILoginState {
  switch (action.type) {
    case Actions.LoginActionTypes.ToggleRememberMe:
      return { ...state, rememberMe: action.payload };
    case Actions.LoginActionTypes.SaveUserCredential:
      return { ...state, user: action.user, isLoggedIn: true };
    case Actions.LoginActionTypes.ValidateUserFailed:
      return { ...state, isLoggedIn: false, error: action.error };
  }
  return state;
}
