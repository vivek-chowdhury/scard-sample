import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module';
import { NgModule } from '@angular/core';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    ProductsModule,
    CoreModule,
    SharedModule,
    LoginModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      name: 'sCard Shopping',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
