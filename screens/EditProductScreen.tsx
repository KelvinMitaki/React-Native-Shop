import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";

const EditProductScreen: NavigationStackScreenComponent<{
  productId?: string;
  title?: string;
}> = ({ navigation }) => {
  const product = useSelector((state: Redux) =>
    state.products.userProducts.find(
      p => p.id === navigation.getParam("productId")
    )
  );
  console.log(product);
  return (
    <View>
      <Text>EditProductScreen EditProductScreen</Text>
    </View>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("title")
});

export default EditProductScreen;

const styles = StyleSheet.create({});
