import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { AppBroadcasterService } from './../services/app-broadcaster.service';
import { headerSector, userSelector } from './state/header.reducer';
import { SCREENTYPES } from './../../shared/interfaces/header';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  componentActive = true;
  isUserLoggedIn = false;
  currentScreenType = SCREENTYPES.LOGIN_SCREEN;
  userFullName = '';
  constructor(
    private store: Store<any>,
    private broadcaster: AppBroadcasterService,
    private router: Router
  ) {}

  /**
   * @description This method will invoke when Component is initialized, it is
   * responsible for initialing form group and other member variables.
   */
  ngOnInit(): void {
    this.registerStore();
  }

  /**
   * @description This getter will return true if product buttons are required else return false.
   *
   * @return boolean
   */
  get isProductScreen() {
    return (
      this.isUserLoggedIn &&
      this.currentScreenType === SCREENTYPES.PRODUCT_SCREEN
    );
  }

  /**
   * @description This method is responsible for subscrbing store and listening to any changes
   *  in Login state.
   */
  registerStore(): void {
    this.store
      .pipe(
        select(headerSector),
        takeWhile(() => this.componentActive)
      )
      .subscribe((state) => {
        if (state) {
          this.currentScreenType = state.screenType;
          this.isUserLoggedIn = state.isUserLoggedIn;
        }
      });

    this.store
      .pipe(
        select(userSelector),
        takeWhile(() => this.componentActive)
      )
      .subscribe((state) => {
        if (state) {
          this.userFullName = state.user ? state.user.fullName : '';
        }
      });
  }

  /**
   * @description This method is invoked when user clicks on the Logout option
   * from the Header menu.
   */
  onLogoutClicked(): void {
    this.router.navigate(['']);
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
