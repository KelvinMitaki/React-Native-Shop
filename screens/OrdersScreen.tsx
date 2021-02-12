import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";
import { NavigationParams, NavigationRoute } from "react-navigation";
import { NavigationDrawerProp } from "react-navigation-drawer";
import {
  HeaderButton,
  HeaderButtons,
  Item
} from "react-navigation-header-buttons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import OrderItem from "../components/shop/OrderItem";
import { Button } from "react-native-elements";
import Colors from "../constants/Colors";
import axios from "../axios/axios";
import Order from "../models/Order";
import AsyncStorage from "@react-native-community/async-storage";

export interface FetchOrders {
  type: "fetchOrders";
  payload: Order[];
}

const OrdersScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const {
    order: { orders },
    auth: { token, userId }
  } = useSelector((state: Redux) => state);
  const fetchOrders = useCallback(async (shouldLoad?: boolean) => {
    try {
      shouldLoad && setLoading(true);
      setError(null);
      const { data } = await axios.get(`/orders/${userId}.json?auth=${token}`);
      if (data && typeof data === "object") {
        dispatch<FetchOrders>({
          type: "fetchOrders",
          payload: Object.keys(data).map(key => ({ id: key, ...data[key] }))
        });
      }
      shouldLoad && setLoading(false);
    } catch (error) {
      shouldLoad && setLoading(false);
      setError("Error fetching orders");
      console.log(error);
      if (error.response.status === 401) {
        await AsyncStorage.removeItem("userData");
        navigation.navigate("Auth");
      }
    }
  }, []);

  useEffect(() => {
    fetchOrders(true);
  }, []);
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
  if (!orders.length) {
    return (
      <View style={styles.noproducts}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          You have no orders yet
        </Text>
        <Button
          title="Start Shopping"
          buttonStyle={styles.btn}
          onPress={() => navigation.navigate("ProductsOverview")}
        />
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={o => o.id}
        renderItem={({ item }) => <OrderItem {...item} />}
      />
    </View>
  );
};

OrdersScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Your Orders",
  headerLeft: () => (
    <HeaderButtons
      HeaderButtonComponent={props => (
        <HeaderButton
          {...props}
          onPress={() =>
            ((navigation as unknown) as NavigationDrawerProp<
              NavigationRoute<NavigationParams>
            >).toggleDrawer()
          }
        />
      )}
    >
      <Item
        title="Menu"
        iconName="ios-menu"
        IconComponent={Ionicons}
        iconSize={25}
        color={Platform.OS === "android" ? "white" : Colors.primary}
      />
    </HeaderButtons>
  )
});

export default OrdersScreen;

const styles = StyleSheet.create({
  noproducts: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  btn: {
    alignSelf: "center",
    backgroundColor: Colors.primary,
    marginTop: 10
  }
});
