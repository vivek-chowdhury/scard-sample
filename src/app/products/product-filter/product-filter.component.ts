import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IColor } from './../../shared/interfaces/product';
import { IFilters, IBrand } from './../../shared/interfaces/filtes';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  @Input() filters: IFilters;
  @Output() selectedFilter: EventEmitter<any> = new EventEmitter();

  constructor() {}

  /**
   * @description This getter is responsible for returning list of brand filters
   *
   * @return IBrand[]
   */
  get brandFilters(): IBrand[] {
    return this.filters.brandFilters;
  }

  /**
   * @description This getter is responsible for returning list of colour filters
   *
   * @return IColor[]
   */
  get colourFilters(): IColor[] {
    return this.filters.colourFilters;
  }

  ngOnInit(): void {}

  /**
   * @description This method is invoked when user selects filter from the filter list
   * @param filter Contain reference of selected filter
   */
  handleFilterSelection(filter): void {
    this.selectedFilter.emit(filter);
  }
}
