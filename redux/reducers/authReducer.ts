import { AnyAction } from "redux";

export interface AuthState {}

type Action = AnyAction;

const INITIAL_STATE: AuthState = {};

const authReducer = (state = INITIAL_STATE, action: Action): AuthState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
