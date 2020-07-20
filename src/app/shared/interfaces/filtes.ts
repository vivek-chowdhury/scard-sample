import { IProduct } from './product';
export interface IFilters {
  brandFilters: IBrand[];
  colourFilters: IColour[];
  priceFilters: IPrice;
}

export interface IBrand {
  checked: boolean;
  key: string;
  type: string;
  value: string;
}

export interface IColour {
  color: string;
  title: string;
}

export interface IPrice {
  min: number;
  max: number;
  step: number;
  selected: number;
}
