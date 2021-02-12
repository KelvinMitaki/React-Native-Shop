import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  View
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  HeaderButton,
  HeaderButtons,
  Item
} from "react-navigation-header-buttons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../components/shop/ProductItem";
import { Redux } from "../interfaces/Redux";
import Product from "../models/Product";
import { Button, Text } from "react-native-elements";
import Colors from "../constants/Colors";
import { NavigationDrawerProp } from "react-navigation-drawer";
import {
  NavigationEvents,
  NavigationParams,
  NavigationRoute
} from "react-navigation";
import axios from "../axios/axios";
import AsyncStorage from "@react-native-community/async-storage";

export interface AddToCart {
  type: "addToCart";
  payload: Product;
}

export interface FetchProducts {
  type: "fetchProducts";
  payload: Product[];
}

const ProductsOverviewScreen: NavigationStackScreenComponent<{
  quantity?: number;
}> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {
    products: { availableProducts },
    auth: { token }
  } = useSelector((state: Redux) => state);
  const dispatch = useDispatch();
  const fetchProducts = useCallback(async (shouldLoad?: boolean) => {
    try {
      setError(null);
      shouldLoad ? setLoading(true) : setRefresh(true);
      let { data } = await axios.get(`/products.json?auth=${token}`);
      if (data && typeof data === "object") {
        data = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        dispatch<FetchProducts>({ type: "fetchProducts", payload: data });
      }
      shouldLoad ? setLoading(false) : setRefresh(false);
    } catch (error) {
      shouldLoad ? setLoading(false) : setRefresh(false);
      setError("An Error occured while fetching products");
      if (error.response.status === 401) {
        await AsyncStorage.removeItem("userData");
        navigation.navigate("Auth");
      }
    }
  }, []);
  useEffect(() => {
    fetchProducts(true);
  }, []);
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (!loading && availableProducts.length === 0) {
    return (
      <View style={styles.center}>
        <NavigationEvents onWillFocus={() => fetchProducts()} />
        <Text style={styles.noproducts}>
          No products found. Maybe start adding some!
        </Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.noproducts}>{error}</Text>
        <Button
          title="Try Again"
          buttonStyle={{
            backgroundColor: Colors.primary,
            marginTop: 10,
            paddingHorizontal: 20
          }}
          onPress={() => fetchProducts()}
        />
      </View>
    );
  }
  return (
    <>
      <NavigationEvents onWillFocus={() => fetchProducts()} />
      <FlatList
        data={availableProducts}
        keyExtractor={i => i.id}
        renderItem={({ item }) => <ProductItem {...item} />}
        onRefresh={fetchProducts}
        refreshing={refresh}
      />
    </>
  );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "All Products",
  headerRight: () => (
    <HeaderButtons
      HeaderButtonComponent={props => (
        <HeaderButton {...props} onPress={() => navigation.navigate("Cart")} />
      )}
    >
      <Item
        title="Cart"
        iconName="opencart"
        IconComponent={FontAwesome}
        iconSize={25}
        color={Platform.OS === "android" ? "white" : Colors.primary}
      />
    </HeaderButtons>
  ),
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

export default ProductsOverviewScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  noproducts: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: "bold",
    textAlign: "center"
  }
});
