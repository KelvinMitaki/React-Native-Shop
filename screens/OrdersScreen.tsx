import React from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
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

const OrdersScreen: NavigationStackScreenComponent = () => {
  const { orders } = useSelector((state: Redux) => state.order);
  return (
    <View>
      <Text>OrdersScreen</Text>
      <FlatList
        data={orders}
        keyExtractor={o => o.id}
        renderItem={({ item }) => <Text>{item.totalAmount}</Text>}
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

const styles = StyleSheet.create({});
