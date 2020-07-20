import { IFilters } from './../../shared/interfaces/filtes';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as Actions from './filter.action';
import * as ProductActions from './product.actions';

const filterFeatureSelector = createFeatureSelector<IFilters>('filters');
export const filterSelector = createSelector(
  filterFeatureSelector,
  (state) => state
);

const initialState: IFilters = {
  brandFilters: [],
  colourFilters: [],
  priceFilters: {
    min: 0,
    max: 100,
    step: 1,
    selected: 100,
  },
};

/**
 * @description This function is responsible for retrieving branch filter from avaiable product list.
 * @param products Contains list of products
 * @return array
 */
function getBranchFilter(products) {
  const filter = [];
  const finalFilter = [];
  products.map((product) => {
    const brand = product.brand.toUpperCase();
    if (filter.indexOf(brand) === -1) {
      filter.push(brand);
      finalFilter.push(getFilterObject(brand, 'brand'));
    }
    return brand;
  });
  return finalFilter;
}

/**
 * @description This function is responsible for retrieving colour filter from avaiable filter list.
 * @param filters Contains list of filters
 */
function getColorFilters(filters) {
  const colourFilterObject = relevantFilterObject(filters, 'COLOUR');
  const filter = colourFilterObject.values;
  const finalList = [];
  filter.map((rule) => {
    finalList.push(getFilterObject(rule.title.toUpperCase(), 'colour'));
    return rule;
  });
  return finalList;
}

/**
 * @description This function is responsible for slicing required filter from list
 * @param filters Contains list of filters
 * @param type Contain type of filters
 */
function relevantFilterObject(filters, type) {
  return filters.find((filter) => {
    return filter.type === type;
  });
}

/**
 * @description This function is responsible for setting price filter initial values.
 * @param  products Contains list of products
 */
function getPriceRange(products) {
  const price = {
    min: 1000000,
    max: 100,
    step: 1,
    selected: 100,
  };
  products.map((product) => {
    if (product.price.final_price < price.min) {
      price.min = product.price.final_price;
    }
    if (price.max < product.price.final_price) {
      price.max = product.price.final_price;
    }
    return product;
  });
  price.step = Math.floor(Math.sqrt(price.max));
  price.selected = price.max;
  return price;
}

/**
 * @description This function is responsible for returning filter object
 * @param value Contains value
 */
function getFilterObject(value, type) {
  return { value, type, checked: false, key: value.replace(/\s/g, '') };
}

export function filterReducer(
  state = initialState,
  action: Actions.FilterAction | ProductActions.ProductAction
): IFilters {
  switch (action.type) {
    case ProductActions.ProductActionTypes.LoadProductsSuccess:
      return {
        ...state,
        brandFilters: getBranchFilter(action.products),
        priceFilters: getPriceRange(action.products),
      };
    case Actions.FilterActionTypes.LoadFiltersSuccess:
      return {
        ...state,
        colourFilters: getColorFilters(action.filters),
      };
    case Actions.FilterActionTypes.LoadFiltersFailure:
      return initialState;
    default:
      return state;
  }
}
