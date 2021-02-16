import AsyncStorage from "@react-native-community/async-storage";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import axios from "../axios/axios";
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
    id?: string;
    date: Date;
  };
}

export interface ClearCart {
  type: "clearCart";
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true
  })
});

const CartScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const {
    cart: { items, totalAmount },
    auth: { token, userId }
  } = useSelector((state: Redux) => state);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ fontWeight: "bold", fontSize: 20, color: Colors.primary }}
        >
          {error}
        </Text>
        <Button
          title="Try Again"
          onPress={() => setError(null)}
          buttonStyle={{
            padding: 10,
            paddingHorizontal: 20,
            backgroundColor: Colors.primary,
            marginTop: 10
          }}
        />
      </View>
    );
  }
  return (
    <View>
      <View style={styles.order}>
        <Text style={styles.pricePrt}>
          Total:{" "}
          <Text style={styles.price}>
            {parseFloat((totalAmount as unknown) as string).toFixed(2)}
          </Text>
        </Text>
        <Button
          title="Order Now"
          buttonStyle={styles.btn}
          disabled={!items.length}
          onPress={async () => {
            try {
              setLoading(true);
              setError(null);
              const date = new Date();
              const { data } = await axios.post(
                `/orders/${userId}.json?auth=${token}`,
                {
                  items,
                  totalAmount,
                  date
                }
              );

              items.map(async it => {
                try {
                  await axios.post(`https://exp.host/--/api/v2/push/send`, {
                    to: it.ownerPushToken,
                    title: "order was placed",
                    body: it.title
                  });
                } catch (error) {
                  console.log(error.response);
                }
              });

              dispatch<AddOrder>({
                type: "addOrder",
                payload: { items, totalAmount, date, id: data.name }
              });

              dispatch<ClearCart>({ type: "clearCart" });
              navigation.navigate("Orders");
              setLoading(false);
            } catch (error) {
              setLoading(false);
              setError("Error placing order");
              console.log(error);
              if (error.response.status === 401) {
                await AsyncStorage.removeItem("userData");
                navigation.navigate("Auth");
              }
            }
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
