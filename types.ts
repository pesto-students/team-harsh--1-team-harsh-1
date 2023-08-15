export interface Address {
  id: string
  userId: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  pin: string;
  full_address: string;
}

export interface Order {
  id: string
  userId: string;
  address: Address,
  isPaid: boolean,
  orderItems: Array<{
    product: Product,
    quantity: number
  }>
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  quantity: number;
  isFeatured: boolean;
  size: Size;
  color: Color;
  images: Image[]
};

export interface Image {
  id: string;
  url: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
};

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
};

export interface Size {
  id: string;
  name: string;
  value: string;
};

export interface Color {
  id: string;
  name: string;
  value: string;
};
