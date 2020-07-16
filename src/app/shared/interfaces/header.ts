export interface IHeaderState {
  screenType: SCREENTYPES;
  isUserLoggedIn: boolean;
}

export enum SCREENTYPES {
  PRODUCT_SCREEN = 'PRODUCT_SCREEN',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
}
