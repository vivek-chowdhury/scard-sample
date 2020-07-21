import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  takeWhile,
  filter,
  map,
  distinctUntilChanged,
  debounceTime,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';

import { AppBroadcasterService } from './../services/app-broadcaster.service';
import {
  headerSector,
  userSelector,
  productSelector,
} from './state/header.reducer';
import * as Actions from './state/header.actions';
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
  totalCartItem: number;

  searchKey$: Subject<any>;

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
    if (!this.searchKey$) {
      this.searchKey$ = new Subject();
      this.searchKey$
        .pipe(
          map((event) => event.target.value),
          filter((value) => value.length > 2),
          debounceTime(1000),
          distinctUntilChanged()
        )
        .subscribe((search) => {
          console.log('User entered search key : ', search);
          this.store.dispatch(new Actions.GetProductByTitle(search));
        });
    }
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

    this.store
      .pipe(
        select(productSelector),
        takeWhile(() => this.componentActive)
      )
      .subscribe((state) => {
        if (state && state.length > 0) {
          this.totalCartItem = state.length;
        } else {
          this.totalCartItem = null;
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
   * @description
   *
   * @param event Contains reference of event triggered when user type something in Search field.
   */
  handleSearchProduct(event): void {
    this.searchKey$.next(event);
  }

  /**
   * @description This method will invoked when component is removed from the display list,
   * it is responsible for setting member variable to true which will further unsubscibe any
   * subscription to store.
   */
  ngOnDestroy(): void {
    this.componentActive = false;
    if (this.searchKey$) {
      this.searchKey$.unsubscribe();
    }
  }
}
