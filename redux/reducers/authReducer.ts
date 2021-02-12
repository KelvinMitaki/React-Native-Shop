import { Logout } from "../../components/shop/SideDrawer";
import { SignIn, SignUp } from "../../screens/AuthScreen";

export interface AuthState {
  token: string | null;
  userId: string | null;
}

type Action = SignIn | SignUp | Logout;

const INITIAL_STATE: AuthState = {
  token: null,
  userId: null
};

const authReducer = (state = INITIAL_STATE, action: Action): AuthState => {
  switch (action.type) {
    case "signup":
      return { ...state, ...action.payload };
    case "signin":
      return { ...state, ...action.payload };
    case "logout":
      return { ...state, token: null, userId: null };
    default:
      return state;
  }
};

export default authReducer;
