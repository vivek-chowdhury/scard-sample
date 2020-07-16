export interface IProduct {
  id: string;
  colour: IColor;
  brand: string;
  discount: number;
  rating: 4;
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
