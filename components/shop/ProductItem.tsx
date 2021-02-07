import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Image } from "react-native-elements";
import Product from "../../models/Product";

const ProductItem: React.FC<Product> = prod => {
  return (
    <View>
      <Image source={{ uri: prod.imageUrl }} style={styles.image} />
      <Text>TITLE</Text>
      <Text>$PRICE</Text>
      <View>
        <Button title="View Details" />
        <Button title="To Cart" />
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  }
});
