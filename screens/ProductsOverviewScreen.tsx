import React, { useEffect } from "react";
import { FlatList, Platform, StyleSheet } from "react-native";
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
import { Text } from "react-native-elements";
import Colors from "../constants/Colors";

export interface AddToCart {
  type: "addToCart";
  payload: Product;
}

const ProductsOverviewScreen: NavigationStackScreenComponent<{
  quantity?: number;
}> = ({ navigation }) => {
  const {
    products: { availableProducts },
    cart: { totalQuantity }
  } = useSelector((state: Redux) => state);
  useEffect(() => {
    navigation.setParams({ quantity: totalQuantity });
  }, [totalQuantity]);
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
    <>
      <Text
        style={{
          position: "absolute",
          right: "10%",
          top: "5%",
          color: "white"
        }}
      >
        {navigation.getParam("quantity")}
      </Text>
      <HeaderButtons
        HeaderButtonComponent={props => (
          <HeaderButton
            {...props}
            onPress={() => navigation.navigate("Cart")}
          />
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
    </>
  )
});

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
