import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';

import { filterSelector } from './state/filter.reducer';
import { IFilters, IBrand } from './../shared/interfaces/filtes';
import { IProduct } from './../shared/interfaces/product';
import { SCREENTYPES } from './../shared/interfaces/header';
import { SpinnerManagerService } from './../core/spinner/spinner-manager.service';
import { productListSelector } from './state/product.reducers';

import * as Actions from './state/product.actions';
import * as FilterActons from './state/filter.action';
import * as HeaderAction from './../core/header/state/header.actions';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss'],
})
export class ProductDashboardComponent implements OnInit, OnDestroy {
  componentActive = true;
  productList: IProduct[];
  filters: IFilters;
  isFilterListFetched = false;
  filteredProductList: IProduct[];
  searchKey = '';

  constructor(
    private spinnerManager: SpinnerManagerService,
    private store: Store<any>
  ) {}

  /**
   * @description This getter is responsible for returing list of products fetched from server
   *
   * @return IProduct[]
   */
  get products(): IProduct[] {
    return this.productList || [];
  }

  /**
   * @description This method will invoke when Component is initialized, it is
   * responsible for initialing form group and other member variables.
   */
  ngOnInit(): void {
    this.store.dispatch(
      new HeaderAction.UpdateHeaderButtonState({
        isUserLoggedIn: true,
        screenType: SCREENTYPES.PRODUCT_SCREEN,
      })
    );
    this.registerStore();
    this.spinnerManager.hideSpinner();
  }

  /**
   * @description This method is responsible for subscrbing store and listening to any changes
   *  in Login state.
   */
  registerStore(): void {
    this.store
      .pipe(
        select(filterSelector),
        takeWhile(() => this.componentActive)
      )
      .subscribe((state) => {
        if (state) {
          if (!this.isFilterListFetched) {
            this.isFilterListFetched = true;
            this.store.dispatch(new FilterActons.LoadFilters());
          }
          this.filters = state;
          this.filterProductList();
        }
      });

    this.store
      .pipe(
        select(productListSelector),
        takeWhile(() => this.componentActive)
      )
      .subscribe((state) => {
        if (state) {
          if (
            !state.isListFetched ||
            (state.searchKey === '' && this.searchKey !== state.searchKey)
          ) {
            this.searchKey = '';
            this.store.dispatch(new Actions.LoadProducts());
          } else if (
            state.searchKey !== '' &&
            state.searchKey !== this.searchKey
          ) {
            this.searchKey = state.searchKey;
            this.store.dispatch(
              new Actions.LoadProductsByTitle(this.searchKey)
            );
          }
          this.productList = state.products;
          this.filterProductList();
        }
      });
  }

  /**
   * @description This method is responsible for filtering product list as per current filter selection
   */
  filterProductList(): void {
    let filteredList = [];
    let isFiltered = false;

    if (this.filters.selectedBrandFilters.length > 0) {
      filteredList = this.getBrandFilterList(filteredList);
      isFiltered = true;
    }

    if (this.filters.selectedColourFilters.length > 0) {
      filteredList = this.getColurFilterList(filteredList);
      isFiltered = true;
    }

    this.filteredProductList = isFiltered ? filteredList : this.productList;
  }

  /**
   * @description This method is responsible for filtering product list as per brand filters and returnig filtered list
   *
   * @param existingProducts Contains existing filtered list
   */
  getBrandFilterList(existingProducts: IProduct[]): IProduct[] {
    const items = this.productList.filter((product: IProduct) => {
      return this.isBrandSelected(this.filters.selectedBrandFilters, product);
    });
    return this.mergefinalList(items, existingProducts);
  }

  /**
   * @description This method is responsible for filtering product list as per colour filters and returnig filtered list
   *
   * @param existingProducts Contains existing filtered list
   */
  getColurFilterList(existingProducts: IProduct[]): IProduct[] {
    const items = this.productList.filter((product: IProduct) => {
      return this.isColourSelected(this.filters.selectedColourFilters, product);
    });
    return this.mergefinalList(items, existingProducts);
  }

  /**
   * @description This method is responsible for merging new filtered list and existing list of producted
   *
   * @param freshItems Contains list of filtered items
   * @param exisitingItems Contains list of existing filtered items
   */
  mergefinalList(
    freshItems: IProduct[],
    exisitingItems: IProduct[]
  ): IProduct[] {
    return freshItems && freshItems.length > 0
      ? [...exisitingItems, ...freshItems]
      : exisitingItems;
  }

  /**
   * @description This method is responsible for returning brand object if product brand filter is selected.
   * @param list Contains list of selected brands
   * @param product Contains current product from list
   */
  isBrandSelected(list: IBrand[], product: IProduct): IBrand {
    return list.find((brand: IBrand) => {
      return brand.value === product.brand.toUpperCase();
    });
  }

  /**
   * @description This method is responsible for returning brand object if product Colour filter is selected.
   * @param list Contains list of selected colours
   * @param product Contains current product from list
   */
  isColourSelected(list: IBrand[], product: IProduct): IBrand {
    return list.find((colour: IBrand) => {
      return colour.value === product.colour.title.toUpperCase();
    });
  }

  /**
   * @description This method is invoked when user filter selection is updated. It is
   * responsible for sending the selection information to reducer for updation.
   *
   * @param filter Contains reference of selected filter
   */
  handleFilterUpdated(filter): void {
    this.store.dispatch(new FilterActons.UpdateSelectedFilter(filter));
  }

  /**
   * @description This method is invoked when user clicks on the Add to Cart button, it is
   * responsible for adding selected product to user cart.
   *
   * @param product Contains reference of selected product
   */
  handleAddToCartRequest(product: IProduct): void {
    this.store.dispatch(new Actions.AddProductToCart(product));
  }

  /**
   * @description This method will invoked when component is removed from the display list,
   * it is responsible for setting member variable to true which will further unsubscibe any
   * subscription to store.
   */
  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
