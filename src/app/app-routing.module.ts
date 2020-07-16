import { LoginScreenComponent } from './login/login-screen/login-screen.component';
import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginScreenComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
