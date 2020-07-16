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
});
