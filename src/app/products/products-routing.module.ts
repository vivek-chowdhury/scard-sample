import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDashboardComponent } from './product-dashboard.component';

const routes: Routes = [{ path: '', component: ProductDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
