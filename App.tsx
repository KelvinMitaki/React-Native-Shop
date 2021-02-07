import React from "react";
import { enableScreens } from "react-native-screens";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./redux";
import ProductsOverviewScreen from "./screens/ProductsOverviewScreen";
enableScreens();
const store = createStore(reducers);

const stackNavigator = createStackNavigator({
  Products: ProductsOverviewScreen
});

const App = createAppContainer(stackNavigator);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
