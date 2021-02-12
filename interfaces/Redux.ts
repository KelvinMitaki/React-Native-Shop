import { AuthState } from "../redux/reducers/authReducer";
import { CartState } from "../redux/reducers/cartReducer";
import { OrderState } from "../redux/reducers/orderReducer";
import { ProductsState } from "../redux/reducers/productsReducer";

export interface Redux {
  products: ProductsState;
  form: any;
  cart: CartState;
  order: OrderState;
  auth: AuthState;
}
