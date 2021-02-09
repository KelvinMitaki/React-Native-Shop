import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import {
  HeaderButton,
  HeaderButtons,
  Item
} from "react-navigation-header-buttons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Redux } from "../interfaces/Redux";
import Product from "../models/Product";

interface Prod {
  title: string;
  imageUrl: string;
  price: string;
  description: string;
}

export interface EditProduct {
  type: "editProduct";
  payload: Product;
}

export interface AddNewProduct {
  type: "addProduct";
  payload: Prod;
}

const EditProductScreen: NavigationStackScreenComponent<{
  productId?: string;
  title?: string;
  product?: Prod;
}> = ({ navigation }) => {
  const product = useSelector((state: Redux) =>
    state.products.userProducts.find(
      p => p.id === navigation.getParam("productId")
    )
  );
  const [title, setTitle] = useState<string>(product?.title || "");
  const [imageUrl, setImageUrl] = useState<string>(product?.imageUrl || "");
  const [price, setPrice] = useState<string>(product?.price.toString() || "");
  const [description, setDescription] = useState<string>(
    product?.description || ""
  );
  useEffect(() => {
    navigation.setParams({ product: { title, description, imageUrl, price } });
  }, [title, description, imageUrl, price]);
  return (
    <ScrollView>
      <View style={{ marginTop: 40 }}>
        <Input
          value={title}
          onChangeText={t => setTitle(t)}
          placeholder="Title"
        />
        <Input
          value={imageUrl}
          onChangeText={t => setImageUrl(t)}
          placeholder="Image URL"
        />
        <Input
          value={price.trim()}
          onChangeText={t =>
            (/^\d+$/.test(t) ||
              (!isNaN((t as unknown) as number) &&
                t.toString().indexOf(".") != -1) ||
              t === "") &&
            setPrice(t)
          }
          keyboardType="number-pad"
          placeholder="Price in $"
        />
        <Input
          value={description}
          onChangeText={t => setDescription(t)}
          placeholder="Description"
        />
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam("title") || "Add A New Product",
    headerRight: () => (
      <HeaderButtons
        HeaderButtonComponent={props => (
          <HeaderButton
            {...props}
            onPress={() => console.log(navigation.getParam("product"))}
          />
        )}
      >
        <Item
          title="Menu"
          iconName="checkmark"
          IconComponent={Ionicons}
          iconSize={25}
          color={Platform.OS === "android" ? "white" : Colors.primary}
        />
      </HeaderButtons>
    )
  };
};

export default EditProductScreen;

const styles = StyleSheet.create({});
