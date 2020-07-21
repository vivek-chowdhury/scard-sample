import { IProduct } from './../../../shared/interfaces/product';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: IProduct;
  @Output() addToCart: EventEmitter<any> = new EventEmitter();

  star: { rate: 0; list: [] };
  constructor() {}

  /**
   * @description This getter is resposnible for returning image url
   *
   * @return string
   */
  get productImage(): string {
    return this.product ? this.product.image : '';
  }

  /**
   * @description This getter is resposnible for returning title
   *
   * @return string
   */
  get title(): string {
    return this.product ? this.product.title : '';
  }

  /**
   * @description This getter is resposnible for returning brand name
   *
   * @return string
   */
  get brand(): string {
    return this.product ? this.product.brand : '';
  }

  /**
   * @description This getter is resposnible for returning color name
   *
   * @return string
   */
  get color(): string {
    return this.product && this.product.colour ? this.product.colour.color : '';
  }

  /**
   * @description This getter is resposnible for returning mrp
   *
   * @return number
   */
  get mrp(): number {
    return this.product && this.product.price ? this.product.price.mrp : 0;
  }

  /**
   * @description This getter is resposnible for returning dicsount
   *
   * @return number
   */
  get discount(): string {
    return this.product ? String(this.product.discount) : '';
  }

  get isDiscountRequired(): boolean {
    return this.discount !== '0';
  }

  /**
   * @description This getter is resposnible for returning final price
   *
   * @return number
   */
  get finalPrice(): number {
    return this.product && this.product.price
      ? this.product.price.final_price
      : 0;
  }

  ngOnInit(): void {}

  /**
   * @description This method is invoked when user clicks on the Add to Cart button, it
   * is responsible for notifying Product container about the request.
   *
   */
  handleAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
