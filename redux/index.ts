import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";
import productReducer from "./reducers/productsReducer";

const reducers = combineReducers({
  form: formReducer,
  products: productReducer,
  cart: cartReducer,
  order: orderReducer
});
export default reducers;
