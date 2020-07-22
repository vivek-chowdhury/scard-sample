import {
  IProductState,
  IProduct,
  ICart,
} from './../../shared/interfaces/product';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as Actions from './product.actions';
import * as HeaderActions from './../../core/header/state/header.actions';

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
  isListFetched: false,
  error: null,
  cart: [],
  searchKey: '',
};

/**
 * @description This function is resposible for updating cart list, if product
 * is already in the cart than it will update the quantity else add product to cart.
 *
 * @param state Contains reference of previous state
 * @param product Contains reference of selected product
 */
function updateCartList(state: IProductState, product: IProduct): ICart[] {
  const cart = [...state.cart];
  const matchingIndex = cart.findIndex((p: ICart) => {
    return p.item.id === product.id;
  });

  if (matchingIndex < 0) {
    cart.push({ item: product, quantity: 1 });
  } else {
    const item = cart[matchingIndex];
    cart[matchingIndex] = { ...item, quantity: item.quantity + 1 };
  }
  return cart;
}

/**
 * @description This function is invoked when component request any action and
 * reduer needs to update state as per the request action. It takes previous state and
 * return new state as per the action.
 *
 * @param state Contain reference of previous state
 * @param action Contains reference of action
 */
export function productsReducer(
  state: IProductState = initialProductState,
  action: Actions.ProductAction | HeaderActions.HeaderAction
): IProductState {
  switch (action.type) {
    case Actions.ProductActionTypes.LoadProductsSuccess:
      return { ...state, products: action.products, isListFetched: true };
    case Actions.ProductActionTypes.LoadProductsFailed:
      return { ...state, products: [], error: action.error };
    case Actions.ProductActionTypes.AddProductToCart:
      return { ...state, cart: updateCartList(state, action.product) };
    case HeaderActions.HeaderActionTypes.GetProductByTitle:
      return { ...state, searchKey: action.key };
  }
  return state;
}
