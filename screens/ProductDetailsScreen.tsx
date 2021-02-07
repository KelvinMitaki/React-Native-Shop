import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";

const ProductDetailsScreen: NavigationStackScreenComponent<{
  productId?: string;
  title?: string;
}> = ({ navigation }) => {
  const productId = navigation.getParam("productId");
  const prod = useSelector((state: Redux) =>
    state.products.availableProducts.find(p => p.id === productId)
  );
  return (
    <View>
      <Text>{prod?.title}</Text>
    </View>
  );
};

ProductDetailsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("title")
});

export default ProductDetailsScreen;

const styles = StyleSheet.create({});
