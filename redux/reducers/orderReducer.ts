import { AddOrder } from "../../screens/CartScreen";

export interface OrderState {}

type Action = AddOrder;

const INITIAL_STATE: OrderState = {};

const orderReducer = (state = INITIAL_STATE, action: Action): OrderState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default orderReducer;
