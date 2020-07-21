import { IProduct } from './../../shared/interfaces/product';
import { Action } from '@ngrx/store';

export enum ProductActionTypes {
  LoadProducts = '[PRODUCT API] Load list of products from server',
  LoadProductsSuccess = '[PRODUCT API] Product list loaded from server',
  LoadProductsFailed = '[PRODUCT API] Failed to load products',
  AddProductToCart = '[PRODUCT LIST] Add product to cart',
}

export class LoadProducts implements Action {
  readonly type = ProductActionTypes.LoadProducts;
  constructor() {}
}

export class LoadProductsSuccess implements Action {
  readonly type = ProductActionTypes.LoadProductsSuccess;
  constructor(public products: IProduct[]) {}
}

export class LoadProductsFailed implements Action {
  readonly type = ProductActionTypes.LoadProductsFailed;
  constructor(public error: any) {}
}

export class AddProductToCart implements Action {
  readonly type = ProductActionTypes.AddProductToCart;
  constructor(public product: IProduct) {}
}

export type ProductAction =
  | LoadProducts
  | LoadProductsFailed
  | LoadProductsSuccess
  | AddProductToCart;
