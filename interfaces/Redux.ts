import { CartState } from "../redux/reducers/cartReducer";
import { ProductsState } from "../redux/reducers/productsReducer";

export interface Redux {
  products: ProductsState;
  cart: CartState;
}
