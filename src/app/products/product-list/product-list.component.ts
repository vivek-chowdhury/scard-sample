import { IProduct } from './../../shared/interfaces/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input()
  products: IProduct[];

  constructor() {}

  ngOnInit(): void {}

  /**
   * @description This method is used for track by modifier
   *
   * @param index contains index of element
   * @param el contains reference of element
   * @return number
   */
  trackByModifier(index: number, el: any): number {
    return el.id;
  }
}
