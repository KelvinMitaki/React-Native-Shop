import { combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";
import productReducer from "./reducers/productsReducer";

const reducers = combineReducers({
  products: productReducer,
  cart: cartReducer,
  order: orderReducer
});
export default reducers;
