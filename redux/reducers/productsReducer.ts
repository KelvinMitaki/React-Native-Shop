import { AnyAction } from "redux";
import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/Product";

export interface ProductsState {
  availableProducts: Product[];
  userProducts: Product[];
}

type Action = AnyAction;

const INITIAL_STATE: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(p => p.id === "u1")
};

const productReducer = (
  state = INITIAL_STATE,
  action: Action
): ProductsState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default productReducer;
