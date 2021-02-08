import React from "react";
import { LogBox, Platform } from "react-native";
import { enableScreens } from "react-native-screens";
import {
  createAppContainer,
  CreateNavigatorConfig,
  NavigationStackRouterConfig
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Colors from "./constants/Colors";
import reducers from "./redux";
import CartScreen from "./screens/CartScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProductsOverviewScreen from "./screens/ProductsOverviewScreen";
import OrdersScreen from "./screens/OrdersScreen";
import {
  StackNavigationConfig,
  StackNavigationOptions,
  StackNavigationProp
} from "react-navigation-stack/lib/typescript/src/vendor/types";
LogBox.ignoreLogs([
  "Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).",
  "It appears that you are using old version of react-navigation library. Please update @react-navigation/bottom-tabs, @react-navigation/stack and @react-navigation/drawer to version 5.10.0 or above to take full advantage of new functionality added to react-native-screens"
]);
enableScreens();
const store = createStore(reducers);

const defaultNavOptions: CreateNavigatorConfig<
  StackNavigationConfig,
  NavigationStackRouterConfig,
  StackNavigationOptions,
  StackNavigationProp
> = {
  defaultNavigationOptions: {
    headerStyle: {
      ...(Platform.OS === "android" && { backgroundColor: Colors.primary })
    },
    headerTintColor: Platform.OS ? "white" : Colors.primary
  }
};

const stackNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen
  },
  defaultNavOptions
);

const drawerNavigator = createDrawerNavigator({
  Products: stackNavigator,
  Orders: createStackNavigator(
    {
      Orders: OrdersScreen
    },
    defaultNavOptions
  )
});

const App = createAppContainer(drawerNavigator);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
