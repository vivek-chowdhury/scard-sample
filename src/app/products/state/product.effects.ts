import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { ProductService } from './../../core/services/product.service';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private action$: Actions,
    private productService: ProductService
  ) {}

  @Effect()
  productList$: Observable<Action> = this.action$.pipe(
    ofType(ProductActions.ProductActionTypes.LoadProducts),
    mergeMap(() =>
      this.productService.getProducts().pipe(
        map((products) => new ProductActions.LoadProductsSuccess(products)),
        catchError((error) => of(new ProductActions.LoadProductsFailed(error)))
      )
    )
  );
}
