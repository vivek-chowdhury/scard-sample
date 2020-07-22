import { MockAppState } from './../../mock/mock.state';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SpinnerManagerService } from './../core/spinner/spinner-manager.service';
import { MockRouter } from './../../mock/mock-router';
import { MockActivatedRoute } from './../../mock/mock-activated-route';
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

  it('should contain two section', () => {
    const leftSection = fixture.debugElement.nativeElement.querySelector(
      '.left-section'
    );

    const rightSection = fixture.debugElement.nativeElement.querySelector(
      '.right-section'
    );
    expect(leftSection).toBeDefined();
    expect(rightSection).toBeDefined();
  });

  it('should be initialized with default values', () => {
    expect(component.componentActive).toBeTruthy();
    expect(component.isFilterListFetched).toBeFalsy();
    expect(component.searchKey).toBe('');
    expect(component.productList).toBeUndefined();
    expect(component.filters).toBeUndefined();
    expect(component.filters).toBeUndefined();
    expect(component.filteredProductList).toBeUndefined();
  });

  it('should update product list', () => {
    store.setState(MockAppState);
    store.refreshState();
    fixture.detectChanges();
    expect(component.productList).toBeDefined();
    expect(component.productList.length).toEqual(0);
  });

  it('should call filter method', () => {
    const spy = spyOn(component, 'filterProductList').and.callThrough();
    store.setState(MockAppState);
    store.refreshState();
    fixture.detectChanges();
    expect(component.filterProductList).toHaveBeenCalled();
  });
});
