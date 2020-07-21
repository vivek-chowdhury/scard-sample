import { IProductState } from './../../../shared/interfaces/product';
import { ILoginState } from './../../../login/state/login.reducer';
import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import * as Action from './header.actions';
import { IHeaderState, SCREENTYPES } from './../../../shared/interfaces/header';
import * as AppAction from './../../../state/application.actions';

const headerFeatureSector = createFeatureSelector<IHeaderState>('header');
export const headerSector = createSelector(headerFeatureSector, (state) => {
  return state;
});

const userFeatureSelector = createFeatureSelector<ILoginState>('login');
export const userSelector = createSelector(userFeatureSelector, (state) => {
  return state;
});

const productFeatureSelector = createFeatureSelector<IProductState>('products');
export const productSelector = createSelector(
  productFeatureSelector,
  (state: IProductState) => {
    return state.cart || [];
  }
);
const initialState: IHeaderState = {
  screenType: SCREENTYPES.LOGIN_SCREEN,
  isUserLoggedIn: false,
  userName: '',
};

/**
 * @description
 *
 * @param state Contains previous header state
 * @param action Contains action to perform
 */
export function headerReducer(
  state: IHeaderState = initialState,
  action: Action.HeaderAction | AppAction.AppAction
): IHeaderState {
  switch (action.type) {
    case Action.HeaderActionTypes.UpdateHeaderButtonState:
      return {
        ...state,
        ...action.state,
      };
    case AppAction.AppActionTypes.LogoutUser:
      return initialState;
    default:
      return state;
  }
}
