import { IBrand } from './../../shared/interfaces/filtes';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterComponent } from './product-filter.component';

const filters = {
  brandFilters: [],
  colourFilters: [],
  priceFilters: {
    min: 0,
    max: 100,
    step: 1,
    selected: 100,
  },
};
describe('ProductFilterComponent', () => {
  let component: ProductFilterComponent;
  let fixture: ComponentFixture<ProductFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFilterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilterComponent);
    component = fixture.componentInstance;
    component.filters = filters;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
