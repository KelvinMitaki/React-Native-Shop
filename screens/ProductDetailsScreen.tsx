import React from "react";
import { StyleSheet } from "react-native";
import { Button, Image, Text } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
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
    <ScrollView>
      <Image source={{ uri: prod?.imageUrl }} style={styles.image} />
      <Button title="Add To Cart" buttonStyle={styles.button} />
      <Text style={styles.price}>${prod?.price.toFixed(2)}</Text>
      <Text style={styles.description}>{prod?.description}</Text>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("title")
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
