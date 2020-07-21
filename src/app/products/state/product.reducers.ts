import { IProductState } from './../../shared/interfaces/product';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as Actions from './product.actions';

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
