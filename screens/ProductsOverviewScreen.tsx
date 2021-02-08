import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
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

export interface AddToCart {
  type: "addToCart";
  payload: Product;
}

const ProductsOverviewScreen: NavigationStackScreenComponent = () => {
  const { availableProducts } = useSelector((state: Redux) => state.products);
  return (
    <>
      <FlatList
        data={availableProducts}
        keyExtractor={i => i.id}
        renderItem={({ item }) => <ProductItem {...item} />}
      />
    </>
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
        color="white"
      />
    </HeaderButtons>
  )
});

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
