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
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Redux } from "../interfaces/Redux";
import Product from "../models/Product";
import { Dispatch } from "redux";

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
  product?: Prod | Product;
  newProduct?: Dispatch<AddNewProduct>;
  editProduct?: Dispatch<EditProduct>;
}> = ({ navigation }) => {
  const product = useSelector((state: Redux) =>
    state.products.userProducts.find(
      p => p.id === navigation.getParam("productId")
    )
  );
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>(product?.title || "");
  const [imageUrl, setImageUrl] = useState<string>(product?.imageUrl || "");
  const [price, setPrice] = useState<string>(product?.price.toString() || "");
  const [description, setDescription] = useState<string>(
    product?.description || ""
  );
  const [titleError, setTitleError] = useState<string | null>(null);
  const [imageUrlError, setImageUrlError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  useEffect(() => {
    if (!titleError && !imageUrlError && !priceError && !descriptionError) {
      if (!product) {
        // NEW PRODUCT
        navigation.setParams({ newProduct: dispatch });
        navigation.setParams({
          product: { title, description, imageUrl, price }
        });
      } else {
        // EDIT PRODUCT
        navigation.setParams({
          product: { ...product, title, description, imageUrl, price }
        });
        navigation.setParams({ editProduct: dispatch });
      }
    }
  }, [title, description, imageUrl, price]);
  return (
    <ScrollView>
      <View style={{ marginTop: 40 }}>
        <Input
          value={title}
          onChangeText={t => setTitle(t)}
          placeholder="Title"
          autoCapitalize="words"
          onEndEditing={() =>
            title.trim().length < 1
              ? setTitleError("enter a valid title")
              : setTitleError(null)
          }
          errorMessage={titleError || ""}
          inputContainerStyle={{
            ...(titleError && {
              borderBottomColor: "red"
            })
          }}
          errorStyle={{
            fontSize: 16,
            fontWeight: "bold",
            textTransform: "capitalize"
          }}
        />
        <Input
          value={imageUrl}
          onChangeText={t => setImageUrl(t)}
          placeholder="Image URL"
          autoCapitalize="none"
          onEndEditing={() =>
            imageUrl.trim().length < 1
              ? setImageUrlError("enter a valid image url")
              : setImageUrlError(null)
          }
          errorMessage={imageUrlError || ""}
          inputContainerStyle={{
            ...(imageUrlError && {
              borderBottomColor: "red"
            })
          }}
          errorStyle={{
            fontSize: 16,
            fontWeight: "bold",
            textTransform: "capitalize"
          }}
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
          onEndEditing={() =>
            price.trim().length < 1
              ? setPriceError("enter a valid price")
              : setPriceError(null)
          }
          errorMessage={priceError || ""}
          inputContainerStyle={{
            ...(priceError && {
              borderBottomColor: "red"
            })
          }}
          errorStyle={{
            fontSize: 16,
            fontWeight: "bold",
            textTransform: "capitalize"
          }}
        />
        <Input
          value={description}
          onChangeText={t => setDescription(t)}
          placeholder="Description"
          onEndEditing={() =>
            description.trim().length < 1
              ? setDescriptionError("enter a valid title")
              : setDescriptionError(null)
          }
          errorMessage={descriptionError || ""}
          inputContainerStyle={{
            ...(descriptionError && {
              borderBottomColor: "red"
            })
          }}
          errorStyle={{
            fontSize: 16,
            fontWeight: "bold",
            textTransform: "capitalize"
          }}
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
            onPress={() => {
              const editProduct = navigation.getParam("editProduct");
              const product = navigation.getParam("product");
              if (editProduct && product) {
                editProduct({
                  type: "editProduct",
                  payload: product as Product
                });
                navigation.popToTop();
              }
              const newProduct = navigation.getParam("newProduct");
              if (newProduct && product) {
                newProduct({ type: "addProduct", payload: product as Prod });
                navigation.popToTop();
              }
            }}
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
