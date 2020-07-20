import { IColor } from './../../shared/interfaces/product';
import { IFilters, IBrand } from './../../shared/interfaces/filtes';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  @Input() filters: IFilters;
  constructor() {}

  /**
   * @description
   */
  get brandFilters(): IBrand[] {
    return this.filters.brandFilters;
  }

  /**
   * @description
   */
  get colourFilters(): IColor[] {
    return this.filters.colourFilters;
  }

  ngOnInit(): void {}
}
