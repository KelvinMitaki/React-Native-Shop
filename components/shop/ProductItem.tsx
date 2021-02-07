import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Image } from "react-native-elements";
import Colors from "../../constants/Colors";
import Product from "../../models/Product";

const ProductItem: React.FC<Product> = prod => {
  return (
    <View style={styles.product}>
      <Image source={{ uri: prod.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{prod.title}</Text>
      <Text style={styles.price}>
        ${prod.price.toFixed(2).toLocaleString()}
      </Text>
      <View style={styles.btnPrt}>
        <Button
          buttonStyle={{ backgroundColor: Colors.primary }}
          containerStyle={styles.btn}
          title="View Details"
        />
        <Button
          buttonStyle={{ backgroundColor: Colors.primary }}
          containerStyle={styles.btn}
          title="To Cart"
        />
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    margin: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 8,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: 200
  },
  btnPrt: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  btn: {
    width: "40%",
    paddingVertical: 20
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    marginLeft: 10
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginLeft: 10
  }
});