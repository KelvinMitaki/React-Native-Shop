import { CartState } from "../redux/reducers/cartReducer";
import { OrderState } from "../redux/reducers/orderReducer";
import { ProductsState } from "../redux/reducers/productsReducer";

export interface Redux {
  products: ProductsState;
  cart: CartState;
  order: OrderState;
  form: any;
}
