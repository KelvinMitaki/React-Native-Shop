import { AnyAction } from "redux";

export interface OrderState {}

type Action = AnyAction;

const INITIAL_STATE: OrderState = {};

const orderReducer = (state = INITIAL_STATE, action: Action): OrderState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default orderReducer;
