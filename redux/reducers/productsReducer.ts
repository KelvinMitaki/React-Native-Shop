import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/Product";
import { DeleteItem } from "../../screens/UserProductsScreen";

export interface ProductsState {
  availableProducts: Product[];
  userProducts: Product[];
}

type Action = DeleteItem;

const INITIAL_STATE: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(p => p.ownerId === "u1")
};

const productReducer = (
  state = INITIAL_STATE,
  action: Action
): ProductsState => {
  switch (action.type) {
    case "deleteItem":
      const { id, ownerId } = action.payload;
      return {
        ...state,
        userProducts: state.userProducts.filter(
          item => item.id === id && item.ownerId === ownerId
        )
      };
    default:
      return state;
  }
};

export default productReducer;
