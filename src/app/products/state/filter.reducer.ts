import { IProduct } from './../../shared/interfaces/product';
import { IFilters, IColour } from './../../shared/interfaces/filtes';
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
  selectedBrandFilters: [],
  colourFilters: [],
  selectedColourFilters: [],
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
function getBranchFilter(products: IProduct[]) {
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
function getColorFilters(filters: IColour[]) {
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
function getPriceRange(products: IProduct[]) {
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
 * @description This function is responsible for modifying filter list and return new state.
 *
 * @param state Contains reference of previous state
 * @param filter Contains reference of selected filter
 */
function updateFilterSelection(state, filter) {
  let modfied;
  switch (filter.type) {
    case 'brand':
      modfied = {
        ...state,
        brandFilters: updateFilterOption(state.brandFilters, filter),
        selectedBrandFilters: updateSelectionList(
          state.selectedBrandFilters,
          filter
        ),
      };
      break;
    case 'colour':
      modfied = {
        ...state,
        colourFilters: updateFilterOption(state.colourFilters, filter),
        selectedColourFilters: updateSelectionList(
          state.selectedColourFilters,
          filter
        ),
      };
      break;
  }
  return modfied;
}

/**
 * @description This function is responsible for updating selection list.
 *
 * @param selectionList Contains list of selected filters
 * @param filter Contains reference of selected option
 */
function updateSelectionList(selectionList, filter) {
  const list = [...selectionList];
  let matchIndex = -1;
  list.forEach((value, index) => {
    if (value.key === filter.key) {
      matchIndex = index;
    }
  });
  if (matchIndex > -1) {
    list.splice(matchIndex, 1);
  } else {
    list.push(filter);
  }
  return list;
}

/**
 * This function is responsible for updating filter options state.
 * @param filter Contains list of filter
 * @param option Contains modfied filter
 */
function updateFilterOption(filter, option) {
  const list = [...filter];
  list.forEach((value, index) => {
    if (value.key === option.key) {
      list[index] = { ...option, checked: !option.checked };
    }
  });
  return [...list];
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
    case Actions.FilterActionTypes.UpdateSelectedFilter:
      return updateFilterSelection(state, action.option);
    default:
      return state;
  }
}
