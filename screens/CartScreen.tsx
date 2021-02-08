import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import CartItemComponent from "../components/shop/CartItem";
import Colors from "../constants/Colors";
import { Redux } from "../interfaces/Redux";
import { CartItem } from "../redux/reducers/cartReducer";

export interface RemoveFromCart {
  type: "removeFromCart";
  payload: string;
}

export interface AddOrder {
  type: "addOrder";
  payload: {
    items: CartItem[];
    totalAmount: number;
  };
}

const CartScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const dispatch = useDispatch();
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
          onPress={() => {
            dispatch<AddOrder>({
              type: "addOrder",
              payload: { items, totalAmount }
            });
            navigation.navigate("Orders");
          }}
        />
      </View>
      <FlatList
        data={items}
        keyExtractor={i => i.id}
        renderItem={({ item }) => <CartItemComponent {...item} />}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart"
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
    borderRadius: 5,
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
  }
});
