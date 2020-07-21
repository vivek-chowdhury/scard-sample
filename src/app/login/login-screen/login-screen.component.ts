import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';

import { IApplicationState } from 'src/app/state/application.state';
import { ILoginState } from './../state/login.reducer';
import { IUser } from './../../shared/interfaces/user';
import { loginSelector } from '../state/login.reducer';
import { SpinnerManagerService } from './../../core/spinner/spinner-manager.service';

import * as LoginActions from './../state/login.action';
import * as ApplicationAction from './../../state/application.actions';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent implements OnInit, OnDestroy {
  loginGroup: FormGroup;
  rememberMeChecked: boolean;
  componentActive = true;
  isInvalidUser = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<IApplicationState>,
    private spinnerManager: SpinnerManagerService
  ) {}

  /**
   * @description This method will invoke when Component is initialized, it is
   * responsible for initialing form group and other member variables.
   */
  ngOnInit(): void {
    this.loginGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.store.dispatch(new ApplicationAction.LogoutUser());
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
        select(loginSelector),
        takeWhile(() => this.componentActive)
      )
      .subscribe((state) => {
        if (state) {
          this.parseValidationResponse(state);
          this.rememberMeChecked = state.rememberMe;
          this.parseUserDetail(state.user);
        }
      });
  }

  /**
   * @description This method is invoked when user return to the login screen and as
   * per setting application needs to prepopulate login form with pervious values.
   *
   */
  parseUserDetail(user: IUser): void {
    if (user) {
      this.loginGroup.patchValue({
        username: user.username,
        password: user.password,
      });
    }
  }

  /**
   * @description This method is invoked when user clicks on the Remember me check box.
   * It is responsible for saving state to Store and in member variable.
   */
  onRememberMeChanged(): void {
    this.rememberMeChecked = !this.rememberMeChecked;
    this.store.dispatch(
      new LoginActions.ToggleRememberMe(this.rememberMeChecked)
    );
  }

  /**
   * @description
   *
   */
  onLoginClicked(): void {
    this.spinnerManager.showSpinner();
    if (this.loginGroup.valid) {
      this.saveUserCredentials();
    }
  }

  /**
   * @description This method is responsible for saving user credention in store if
   * 'Remember me' check box is checked.
   */
  saveUserCredentials(): void {
    const user = this.loginGroup.value;
    this.store.dispatch(new LoginActions.ValidateUser(user));
  }

  /**
   * @description
   */
  parseValidationResponse(state: ILoginState): void {
    if (state.isLoggedIn) {
      this.router.navigate(['/products']);
    } else if (state.error) {
      this.isInvalidUser = true;
      this.spinnerManager.hideSpinner();
    }
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
