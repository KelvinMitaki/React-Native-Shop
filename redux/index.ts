import { combineReducers } from "redux";
import productReducer from "./reducers/productsReducer";

const reducers = combineReducers({
  products: productReducer
});
export default reducers;
