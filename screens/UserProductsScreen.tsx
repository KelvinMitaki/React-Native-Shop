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
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import ProductItem from "../components/shop/ProductItem";
import Colors from "../constants/Colors";
import { Redux } from "../interfaces/Redux";

const UserProductsScreen: NavigationStackScreenComponent = () => {
  const { userProducts } = useSelector((state: Redux) => state.products);
  console.log(userProducts);
  return (
    <View>
      <FlatList
        data={userProducts}
        keyExtractor={p => p.id}
        renderItem={({ item }) => <ProductItem {...item} />}
      />
    </View>
  );
};
UserProductsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Admin",
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
export default UserProductsScreen;

const styles = StyleSheet.create({});
