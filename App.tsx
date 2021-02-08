import React from "react";
import { Platform } from "react-native";
import { enableScreens } from "react-native-screens";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Colors from "./constants/Colors";
import reducers from "./redux";
import CartScreen from "./screens/CartScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProductsOverviewScreen from "./screens/ProductsOverviewScreen";
enableScreens();
const store = createStore(reducers);

const stackNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        ...(Platform.OS === "android" && { backgroundColor: Colors.primary })
      },
      headerTintColor: Platform.OS ? "white" : Colors.primary
    }
  }
);

const App = createAppContainer(stackNavigator);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
