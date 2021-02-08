import React from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { NavigationParams, NavigationRoute } from "react-navigation";
import { NavigationDrawerProp } from "react-navigation-drawer";
import {
  HeaderButton,
  HeaderButtons,
  Item
} from "react-navigation-header-buttons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import OrderItem from "../components/shop/OrderItem";
import { Button } from "react-native-elements";
import Colors from "../constants/Colors";

const OrdersScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { orders } = useSelector((state: Redux) => state.order);
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
