import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProduct } from './../../shared/interfaces/product';
import * as Actions from './product.actions';

export interface IProductState {
  products: IProduct[];
  selectedProductId: string;
  filters: IProductFilters[];
  isListFetched: boolean;
  error: any;
}

export interface IProductFilters {
  type: string;
  value: string;
}

const productFeatureSelector = createFeatureSelector<IProductState>('products');
export const productListSelector = createSelector(
  productFeatureSelector,
  (state) => {
    return state;
  }
);

const initialProductState: IProductState = {
  products: [],
  selectedProductId: null,
  filters: [],
  isListFetched: false,
  error: null,
};

export function productsReducer(
  state: IProductState = initialProductState,
  action: Actions.ProductAction
): IProductState {
  switch (action.type) {
    case Actions.ProductActionTypes.LoadProductsSuccess:
      return { ...state, products: action.products, isListFetched: true };
    case Actions.ProductActionTypes.LoadProductsFailed:
      return { ...state, products: [], error: action.error };
  }
  return state;
}
