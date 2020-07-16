import { ProductEffects } from './state/product.effects';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { SharedModule } from './../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { NgModule } from '@angular/core';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductComponent } from './product-list/product/product.component';
import { productsReducer } from './state/product.reducers';

@NgModule({
  declarations: [
    ProductDashboardComponent,
    ProductListComponent,
    ProductFilterComponent,
    ProductComponent,
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
})
export class ProductsModule {}
