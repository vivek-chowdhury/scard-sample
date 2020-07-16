import { IProductState } from './../state/product.reducers';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SpinnerManagerService } from './../../core/spinner/spinner-manager.service';
import { MockRouter } from './../../../mock/mock-router';
import { MockActivatedRoute } from './../../../mock/mock-activated-route';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductDashboardComponent } from './product-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProductDashboardComponent', () => {
  let component: ProductDashboardComponent;
  let fixture: ComponentFixture<ProductDashboardComponent>;
  let store: MockStore;
  const initialProductState = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [ProductDashboardComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
        SpinnerManagerService,
        provideMockStore(initialProductState),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProductDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
