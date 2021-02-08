import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { Redux } from "../interfaces/Redux";

export interface RemoveFromCart {
  type: "removeFromCart";
  payload: string;
}

const CartScreen: NavigationStackScreenComponent = () => {
  const { items, totalAmount } = useSelector((state: Redux) => state.cart);
  return (
    <View>
      <View style={styles.order}>
        <Text style={styles.pricePrt}>
          Total: <Text style={styles.price}>{totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          buttonStyle={styles.btn}
          disabled={!items.length}
        />
      </View>
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

const styles = StyleSheet.create({
  order: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 8,
    elevation: 10,
    flexDirection: "row",
    width: "90%",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white"
  },
  pricePrt: {
    fontSize: 20,
    fontWeight: "bold"
  },
  price: {
    color: Colors.primary,
    fontWeight: "bold"
  },
  btn: {
    backgroundColor: Colors.accent
  },
  btnContainer: {}
});
