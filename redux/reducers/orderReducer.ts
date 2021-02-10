import Order from "../../models/Order";
import { AddOrder } from "../../screens/CartScreen";

export interface OrderState {
  orders: Order[];
}

type Action = AddOrder;

const INITIAL_STATE: OrderState = {
  orders: []
};

const orderReducer = (state = INITIAL_STATE, action: Action): OrderState => {
  switch (action.type) {
    case "addOrder":
      return {
        ...state,
        orders: [{ ...action.payload, id: action.payload.id! }, ...state.orders]
      };
    default:
      return state;
  }
};

export default orderReducer;
