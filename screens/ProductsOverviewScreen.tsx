import React, { useEffect } from "react";
import { FlatList, Platform, StyleSheet } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  HeaderButton,
  HeaderButtons,
  Item
} from "react-navigation-header-buttons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useSelector } from "react-redux";
import ProductItem from "../components/shop/ProductItem";
import { Redux } from "../interfaces/Redux";
import Product from "../models/Product";
import { Text } from "react-native-elements";
import Colors from "../constants/Colors";
import { NavigationDrawerProp } from "react-navigation-drawer";
import { NavigationParams, NavigationRoute } from "react-navigation";

export interface AddToCart {
  type: "addToCart";
  payload: Product;
}

export interface FetchProducts {
  type: "fetchProducts";
  payload: Product[];
}

const ProductsOverviewScreen: NavigationStackScreenComponent<{
  quantity?: number;
}> = () => {
  const {
    products: { availableProducts }
  } = useSelector((state: Redux) => state);

  return (
    <FlatList
      data={availableProducts}
      keyExtractor={i => i.id}
      renderItem={({ item }) => <ProductItem {...item} />}
    />
  );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "All Products",
  headerRight: () => (
    <HeaderButtons
      HeaderButtonComponent={props => (
        <HeaderButton {...props} onPress={() => navigation.navigate("Cart")} />
      )}
    >
      <Item
        title="Cart"
        iconName="opencart"
        IconComponent={FontAwesome}
        iconSize={25}
        color={Platform.OS === "android" ? "white" : Colors.primary}
      />
    </HeaderButtons>
  ),
  headerLeft: () => (
    <HeaderButtons
      HeaderButtonComponent={props => (
        <HeaderButton
          {...props}
          onPress={() =>
            ((navigation as unknown) as NavigationDrawerProp<
              NavigationRoute<NavigationParams>
            >).toggleDrawer()
          }
        />
      )}
    >
      <Item
        title="Menu"
        iconName="ios-menu"
        IconComponent={Ionicons}
        iconSize={25}
        color={Platform.OS === "android" ? "white" : Colors.primary}
      />
    </HeaderButtons>
  )
});

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
