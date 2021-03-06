import React from "react";
import { LogBox, Platform } from "react-native";
import { enableScreens } from "react-native-screens";
import {
  createAppContainer,
  CreateNavigatorConfig,
  createSwitchNavigator,
  NavigationStackRouterConfig
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerIconProps,
  NavigationDrawerOptions
} from "react-navigation-drawer";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { Ionicons } from "@expo/vector-icons";
import thunk from "redux-thunk";
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
import UserProductsScreen from "./screens/UserProductsScreen";
import EditProductScreen from "./screens/EditProductScreen";
import AuthScreen from "./screens/AuthScreen";
import StartUpScreen from "./screens/StartUpScreen";
import SideDrawer from "./components/shop/SideDrawer";
LogBox.ignoreLogs([
  "Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).",
  "It appears that you are using old version of react-navigation library. Please update @react-navigation/bottom-tabs, @react-navigation/stack and @react-navigation/drawer to version 5.10.0 or above to take full advantage of new functionality added to react-native-screens",
  "Warning: Cannot update a component from inside the function body of a different component."
]);
enableScreens();
const store = createStore(reducers, applyMiddleware(thunk));

const options: CreateNavigatorConfig<
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
  {
    ...options,
    navigationOptions: {
      drawerIcon: (config: any) => (
        <Ionicons name="ios-cart" size={23} color={config.tintColor} />
      )
    }
  }
);

const drawerNavigator = createDrawerNavigator(
  {
    Products: stackNavigator,
    Orders: createStackNavigator(
      {
        Orders: OrdersScreen
      },
      {
        ...options,
        navigationOptions: {
          drawerIcon: (config: DrawerIconProps) => (
            <Ionicons name="ios-list" size={23} color={config.tintColor} />
          )
        }
      }
    ),
    UserProducts: createStackNavigator(
      {
        // @ts-ignore
        UserProducts: UserProductsScreen,
        EditProduct: EditProductScreen
      },
      {
        ...options,
        navigationOptions: {
          drawerIcon: cfg => (
            <Ionicons name="ios-create" size={23} color={cfg.tintColor} />
          ),
          drawerLabel: "Admin"
        } as NavigationDrawerOptions
      }
    )
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: SideDrawer
  }
);

const switchNavigator = createSwitchNavigator({
  StartUp: StartUpScreen,
  Auth: createStackNavigator(
    {
      SignIn: AuthScreen
    },
    options
  ),
  Main: drawerNavigator
});
const App = createAppContainer(switchNavigator);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
