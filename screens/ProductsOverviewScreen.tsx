import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";

const ProductsOverviewScreen = () => {
  const { availableProducts } = useSelector((state: Redux) => state.products);
  return (
    <View>
      <Text>ProductsOverviewScreen</Text>
      <FlatList
        data={availableProducts}
        keyExtractor={i => i.id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
