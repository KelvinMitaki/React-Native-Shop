import { AnyAction } from "redux";
import Product from "../../models/Product";
import { ClearCart, RemoveFromCart } from "../../screens/CartScreen";
import { AddToCart } from "../../screens/ProductsOverviewScreen";
import { DeleteItem } from "../../screens/UserProductsScreen";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

type Action = AddToCart | RemoveFromCart | ClearCart | DeleteItem;

const INITIAL_STATE: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0
};

const cartReducer = (state = INITIAL_STATE, action: Action): CartState => {
  switch (action.type) {
    case "addToCart":
      if (action.payload && Object.keys(action.payload).length !== 0) {
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
      }
      return state;
    case "removeFromCart":
      let cartItems = state.items;
      const itemIndex = cartItems.findIndex(it => it.id === action.payload);
      let itemToBeDeleted = cartItems[itemIndex];
      if (itemToBeDeleted.quantity > 1) {
        itemToBeDeleted = {
          ...itemToBeDeleted,
          quantity: itemToBeDeleted.quantity - 1
        };
        cartItems[itemIndex] = itemToBeDeleted;
      } else {
        cartItems = cartItems.filter(it => it.id !== action.payload);
      }
      let amount;
      let quantity;
      if (cartItems.length) {
        amount = cartItems
          .map(it => it.price * it.quantity)
          .reduce((acc, cur) => acc + cur);
        quantity = cartItems
          .map(it => it.quantity)
          .reduce((acc, cur) => acc + cur);
      } else {
        amount = 0;
        quantity = 0;
      }
      return {
        ...state,
        items: cartItems,
        totalAmount: amount,
        totalQuantity: quantity
      };
    case "clearCart":
      return { ...state, items: [], totalQuantity: 0, totalAmount: 0 };
    case "deleteItem":
      const newItems = state.items.filter(it => it.id !== action.payload.id);
      let newAmount, newQuantity;
      if (newItems.length) {
        newAmount = newItems
          .map(it => it.price * it.quantity)
          .reduce((acc, cur) => acc + cur);
        newQuantity = newItems
          .map(it => it.quantity)
          .reduce((acc, cur) => acc + cur);
      } else {
        newAmount = 0;
        newQuantity = 0;
      }
      return {
        ...state,
        items: newItems,
        totalAmount: newAmount,
        totalQuantity: newQuantity
      };
    default:
      return state;
  }
};

export default cartReducer;
