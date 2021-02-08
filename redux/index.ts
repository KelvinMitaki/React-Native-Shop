import { combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productsReducer";

const reducers = combineReducers({
  products: productReducer,
  cart: cartReducer
});
export default reducers;
