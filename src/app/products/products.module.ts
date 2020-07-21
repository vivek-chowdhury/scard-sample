import { FilterEffects } from './state/fliter.effects';
import { ProductEffects } from './state/product.effects';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { SharedModule } from './../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { NgModule } from '@angular/core';
import { ProductDashboardComponent } from './product-dashboard.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductComponent } from './product-list/product/product.component';
import { productsReducer } from './state/product.reducers';
import { CheckboxFilterComponent } from './product-filter/checkbox-filter/checkbox-filter.component';
import { filterReducer } from './state/filter.reducer';

@NgModule({
  declarations: [
    ProductDashboardComponent,
    ProductListComponent,
    ProductFilterComponent,
    ProductComponent,
    CheckboxFilterComponent,
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', productsReducer),
    StoreModule.forFeature('filters', filterReducer),
    EffectsModule.forFeature([ProductEffects, FilterEffects]),
  ],
})
export class ProductsModule {}
