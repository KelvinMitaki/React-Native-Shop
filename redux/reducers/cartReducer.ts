import { AnyAction } from "redux";
import Product from "../../models/Product";
import { AddToCart } from "../../screens/ProductsOverviewScreen";

interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: 0;
}

type Action = AddToCart;

const INITIAL_STATE: CartState = {
  items: [],
  totalAmount: 0
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
      //   let item=state.items.find(it=>it.id===action.payload.id)
      //   if(item){
      //       item={...item,quantity:item.quantity+1}
      //   }else{
      //       item={...action.payload,quantity:1}
      //   }
      return { ...state, items };
    default:
      return state;
  }
};

export default cartReducer;
