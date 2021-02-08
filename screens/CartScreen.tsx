import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";

const CartScreen = () => {
  const { items } = useSelector((state: Redux) => state.cart);
  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <>
            <Text>{item.title}</Text>
            <Text>{item.quantity}</Text>
          </>
        )}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
