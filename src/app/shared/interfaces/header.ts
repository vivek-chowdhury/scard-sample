export interface IHeaderState {
  screenType: SCREENTYPES;
  isUserLoggedIn: boolean;
  userName?: string;
}

export enum SCREENTYPES {
  PRODUCT_SCREEN = 'PRODUCT_SCREEN',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
}
