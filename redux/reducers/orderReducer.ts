import Order from "../../models/Order";
import { AddOrder } from "../../screens/CartScreen";
import { FetchOrders } from "../../screens/OrdersScreen";

export interface OrderState {
  orders: Order[];
}

type Action = AddOrder | FetchOrders;

const INITIAL_STATE: OrderState = {
  orders: []
};

const orderReducer = (state = INITIAL_STATE, action: Action): OrderState => {
  switch (action.type) {
    case "fetchOrders":
      return { ...state, orders: action.payload };
    case "addOrder":
      return {
        ...state,
        orders: [...state.orders, { ...action.payload, id: action.payload.id! }]
      };
    default:
      return state;
  }
};

export default orderReducer;
