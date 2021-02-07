import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useSelector } from "react-redux";
import ProductItem from "../components/shop/ProductItem";
import { Redux } from "../interfaces/Redux";

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

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products"
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
