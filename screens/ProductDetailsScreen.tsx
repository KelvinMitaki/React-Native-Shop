import React, { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import { Button, Image, Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import {
  HeaderButton,
  HeaderButtons,
  Item
} from "react-navigation-header-buttons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { Redux } from "../interfaces/Redux";
import { FontAwesome } from "@expo/vector-icons";
import { AddToCart } from "./ProductsOverviewScreen";

const ProductDetailsScreen: NavigationStackScreenComponent<{
  productId?: string;
  title?: string;
  quantity?: number;
}> = ({ navigation }) => {
  const productId = navigation.getParam("productId");
  const prod = useSelector((state: Redux) =>
    state.products.availableProducts.find(p => p.id === productId)
  );
  const { totalQuantity } = useSelector((state: Redux) => state.cart);
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image source={{ uri: prod?.imageUrl }} style={styles.image} />
      <Button
        title="Add To Cart"
        buttonStyle={styles.button}
        onPress={() =>
          dispatch<AddToCart>({ type: "addToCart", payload: prod! })
        }
      />
      <Text style={styles.price}>${prod?.price.toFixed(2)}</Text>
      <Text style={styles.description}>{prod?.description}</Text>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("title"),
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
  )
});

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%"
  },
  button: {
    backgroundColor: Colors.primary,
    width: "90%",
    alignSelf: "center",
    marginVertical: 10
  },
  price: {
    fontSize: 20,
    color: "#888",
    marginVertical: 10,
    alignSelf: "center"
  },
  description: {
    textAlign: "center",
    marginHorizontal: 10
  }
});
