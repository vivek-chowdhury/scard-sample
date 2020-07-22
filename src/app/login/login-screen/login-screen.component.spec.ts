import { MockTranslateLoader } from './../../../mock/translate-loader.mock';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MockRouter } from './../../../mock/mock-router';
import { MockActivatedRoute } from './../../../mock/mock-activated-route';
import { SpinnerManagerService } from './../../core/spinner/spinner-manager.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { LoginScreenComponent } from './login-screen.component';

describe('LoginScreenComponent', () => {
  let component: LoginScreenComponent;
  let fixture: ComponentFixture<LoginScreenComponent>;
  let store: MockStore;
  const initialState = { rememberMe: false };

  function updateForm(username, password) {
    fixture.componentInstance.loginGroup.controls.username.setValue(username);
    fixture.componentInstance.loginGroup.controls.password.setValue(password);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: MockTranslateLoader,
          },
        }),
      ],
      declarations: [LoginScreenComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
        SpinnerManagerService,
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LoginScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initial login form', () => {
    expect(component.rememberMeChecked).toBeFalsy();
    expect(component.componentActive).toBeTruthy();
    expect(component.isInvalidUser).toBeFalsy();
    expect(component.loginGroup).toBeTruthy();
  });

  it('should create login form with input field', () => {
    const username = fixture.debugElement.nativeElement.querySelector(
      '#username'
    );
    const password = fixture.debugElement.nativeElement.querySelector(
      '#password'
    );
    const rememberMe = fixture.debugElement.nativeElement.querySelector(
      '#rememberMe'
    );

    expect(username).toBeDefined();
    expect(password).toBeDefined();
    expect(rememberMe).toBeDefined();
  });

  it('should contain emtpy input fields', () => {
    const username = fixture.debugElement.nativeElement.querySelector(
      '#username'
    );

    const password = fixture.debugElement.nativeElement.querySelector(
      '#password'
    );

    const rememberMe = fixture.debugElement.nativeElement.querySelector(
      '#rememberMe'
    );
    expect(username.value).toBe('');
    expect(password.value).toBe('');
    expect(rememberMe.checked).toBeFalse();
  });

  it('should contain valid placeholder text', () => {
    const username = fixture.debugElement.nativeElement.querySelector(
      '#username'
    );

    const password = fixture.debugElement.nativeElement.querySelector(
      '#password'
    );
    expect(username.placeholder).toBe('Enter User id');
    expect(password.placeholder).toBe('Enter password');
  });

  it('should display disable login button when input is field is empty', () => {
    updateForm('', '');
    const submit = fixture.debugElement.nativeElement.querySelector('#submit');
    expect(submit.disabled).toBeTrue();
  });
});
