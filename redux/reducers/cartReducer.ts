import { AnyAction } from "redux";
import Product from "../../models/Product";
import { AddToCart } from "../../screens/ProductsOverviewScreen";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

type Action = AddToCart;

const INITIAL_STATE: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0
};

const cartReducer = (state = INITIAL_STATE, action: Action): CartState => {
  switch (action.type) {
    case "addToCart":
      let items = state.items;
      let item = items.findIndex(i => i.id === action.payload.id);
      if (item !== -1) {
        const quantity = items[item].quantity;
        items[item] = { ...action.payload, quantity: quantity + 1 };
      } else {
        items = [{ ...action.payload, quantity: 1 }, ...items];
      }
      const totalAmount = items
        .map(it => it.quantity * it.price)
        .reduce((acc, cur) => acc + cur);
      const totalQuantity = items
        .map(it => it.quantity)
        .reduce((acc, cur) => acc + cur);

      return { ...state, items, totalAmount, totalQuantity };
    default:
      return state;
  }
};

export default cartReducer;
