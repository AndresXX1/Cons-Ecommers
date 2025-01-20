import { IStore } from "../pages/Payment/Delivery/stores";

export type CardProps = {
  img: string;
  id: number;
  name: string;
  cuot: string;
  price?: string;
};

export type UserProps = {
  id: number;
  create: string;
  update: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  avatar: string;
  role: string;
  cuponizate?: boolean;
  smarter_token?: string;
  notification_token?: string;
  last_login?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  gender?: string | null;
  points?: number;
  cuil?: string;
  address?: Address[];
  birthday?: string;
};

export interface Address {
  street: string;
  number: number;
  zipCode: string;
  city: string;
  province: string;
}

export interface Category {
  id: string;
  create: string;
  update: string;
  name: string;
  status: string;
}

export interface Brand {
  id: number;
  create?: string;
  update?: string;
  name?: string;
  status?: string;
}

export interface NavProps {
  category?: Category[];
  brand?: Brand[];
  cart?: CartState;
}

export interface DeliveryProps {
  amounts: {
    price: number;
    price_incl_tax: number;
    price_insurance: number;
    price_shipment: number;
    seller_price: number;
    seller_price_incl_tax: number;
  };
  carrier: {
    id: number;
    logo: string;
    name: string;
    rating: number;
  };
  delivery_time: {
    estimated_delivery: string;
    estimation_expires_at: string;
    max: number;
    min: number;
  };
  impediments: null | string;
  rate: {
    id: number;
    source: string;
    tariff_id: number;
  };
  tags: string[];
}

export interface ImagesProds {
  default: string[];
  black: string[];
  white: string[];
  grey: string[];
  silver: string[];
  gold: string[];
  blue: string[];
  red: string[];
  green: string[];
  pink: string[];
  purple: string[];
}

export interface ProductProps {
  id?: number;
  name?: string;
  price?: string;
  final_price: string;
  description?: string;
  stock?: number;
  iva?: string;
  images?: ImagesProds;
  internal_cost?: string;
  category: Category | null;
  create?: Date;
  update?: Date;
  code?: string;
  highlighted?: boolean;
  status?: string;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  brand?: Brand | null;
  installments?: any[];
}

export interface PriceRangeSliderProps {
  onPriceChange: (min: number, max: number) => void;
  reset?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

export interface IProductResponse {
  ok: boolean;
  product: ProductProps;
}

export interface ProductInfo {
  productId: number;
  quantity: number;
}

export interface BuyerProps {
  name: string;
  email: string;
  phone: string;
}

export interface CreateOrderProps {
  shipmentMethod: string;
  address: Address | IStore | undefined;
  products: ProductInfo[];
  totalPrice: number;
  paymentMethod: string;
}

export interface CartItem {
  product: ProductProps,
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total_price: number;
}
