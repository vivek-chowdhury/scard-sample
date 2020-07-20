import { MockRouter } from './../../../mock/mock-router';
import { MockActivatedRoute } from './../../../mock/mock-activated-route';
import { ActivatedRoute, Router } from '@angular/router';
import { AppBroadcasterService } from './../services/app-broadcaster.service';
import { MockTranslateLoader } from './../../../mock/translate-loader.mock';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;
  const initialState = { rememberMe: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: MockTranslateLoader,
          },
        }),
      ],
      declarations: [HeaderComponent],
      providers: [
        provideMockStore({ initialState }),
        AppBroadcasterService,
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
