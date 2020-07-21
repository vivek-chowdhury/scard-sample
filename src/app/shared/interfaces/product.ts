import { IProductFilters } from './filtes';

export interface IProduct {
  id: string;
  colour: IColor;
  brand: string;
  discount: number;
  rating: number;
  image: string;
  price: IPrice;
  title: string;
}

export interface IColour {
  colour: IColor;
}
export interface IColor {
  color: string;
  title: string;
}

export interface IPrice {
  final_price: number;
  mrp?: number;
}

export interface IProductState {
  products: IProduct[];
  selectedProductId: string;
  filters: IProductFilters[];
  isListFetched: boolean;
  error: any;
  cart: ICart[];
  searchKey: string;
}

export interface ICart {
  item: IProduct;
  quantity: number;
}
