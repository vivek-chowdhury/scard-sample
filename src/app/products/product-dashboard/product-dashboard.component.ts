import { SCREENTYPES } from './../../shared/interfaces/header';
import { IProduct } from './../../shared/interfaces/product';
import { takeWhile } from 'rxjs/operators';
import { productListSelector } from './../state/product.reducers';
import { SpinnerManagerService } from './../../core/spinner/spinner-manager.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IProductState } from '../state/product.reducers';

import * as Actions from './../state/product.actions';
import * as HeaderAction from './../../core/header/state/header.actions';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss'],
})
export class ProductDashboardComponent implements OnInit, OnDestroy {
  componentActive = true;
  productList: IProduct[];

  constructor(
    private spinnerManager: SpinnerManagerService,
    private store: Store<IProductState>
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
        select(productListSelector),
        takeWhile(() => this.componentActive)
      )
      .subscribe((state) => {
        if (state) {
          if (!state.isListFetched) {
            this.store.dispatch(new Actions.LoadProducts());
          }
          this.productList = state.products;
        }
      });
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
