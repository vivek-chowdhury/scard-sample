import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LoginEffects } from './state/login.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { loginReducer } from './state/login.reducer';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './../assets/i18n/', '.json');
}

@NgModule({
  declarations: [LoginScreenComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature('login', loginReducer),
    EffectsModule.forFeature([LoginEffects]),
  ],
})
export class LoginModule {}
