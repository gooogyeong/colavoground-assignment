export type Item = {
  count: number;
  name: string;
  price: number;
};

export type Items = {
  [key: string]: Item;
};

export type Discount = {
  name: string;
  rate: number;
  items: /*[] |*/ Item[];
};

export type Discounts = {
  [key: string]: Discount;
};
