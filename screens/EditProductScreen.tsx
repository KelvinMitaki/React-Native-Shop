import React, { useEffect, useReducer, useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
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
interface Valid {
  title?: boolean;
  imageUrl?: boolean;
  price?: boolean;
  description?: boolean;
}
interface FormInput {
  title?: string;
  imageUrl?: string;
  price?: string;
  description?: string;
}
export interface EditProduct {
  type: "editProduct";
  payload: Product;
}

export interface AddNewProduct {
  type: "addProduct";
  payload: Prod;
}
interface State {
  inputValues: Prod;
  inputValidities: Valid;
  formIsValid: boolean;
}
interface ValidateFormInput {
  type: "validateFormInput";
  payload: {
    inputValues: FormInput;
    inputValidities: Valid;
  };
}
type Action = ValidateFormInput;
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "validateFormInput":
      const inputValues = {
        ...state.inputValues,
        ...action.payload.inputValues
      };
      const inputValidities = {
        ...state.inputValidities,
        ...action.payload.inputValidities
      };
      let formIsValid;
      if (
        Object.values(state.inputValidities).some(
          (val: boolean) => val === false
        )
      ) {
        formIsValid = false;
      } else {
        formIsValid = true;
      }
      return { ...state, inputValues, inputValidities, formIsValid };
    default:
      return state;
  }
};

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
  const [state, reactDispatch] = useReducer(reducer, {
    inputValues: {
      title: product?.title || "",
      price: product?.imageUrl || "",
      imageUrl: product?.price.toString() || "",
      description: product?.description || ""
    },
    inputValidities: {
      description: true,
      imageUrl: true,
      price: true,
      title: true
    },
    formIsValid: product ? true : false
  } as State);
  const {
    inputValues: { title, price, imageUrl, description },
    formIsValid,
    inputValidities
  } = state;
  const updateFormInput = (
    value: string,
    name: "title" | "price" | "imageUrl" | "description"
  ) => {
    let isValid = false;
    if (value.trim().length !== 0) {
      isValid = true;
    }
    reactDispatch({
      type: "validateFormInput",
      payload: {
        inputValues: {
          [name]: value
        },
        inputValidities: {
          [name]: isValid
        }
      }
    });
  };
  // useEffect(() => {
  //   if (!titleError && !imageUrlError && !priceError && !descriptionError) {
  //     if (!product) {
  //       // NEW PRODUCT
  //       navigation.setParams({ newProduct: dispatch });
  //       navigation.setParams({
  //         product: { title, description, imageUrl, price }
  //       });
  //     } else {
  //       // EDIT PRODUCT
  //       navigation.setParams({
  //         product: { ...product, title, description, imageUrl, price }
  //       });
  //       navigation.setParams({ editProduct: dispatch });
  //     }
  //   }
  // }, [title, description, imageUrl, price]);
  return (
    <ScrollView>
      <View style={{ marginTop: 40 }}>
        <Input
          value={title}
          onBlur={() => updateFormInput(title, "title")}
          onChangeText={t => updateFormInput(t, "title")}
          placeholder="Title"
          autoCapitalize="words"
          errorMessage={!inputValidities.title ? "enter a valid title" : ""}
          inputContainerStyle={{
            ...(!inputValidities.title && {
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
          onBlur={() => updateFormInput(imageUrl, "imageUrl")}
          onChangeText={t => updateFormInput(t, "imageUrl")}
          placeholder="Image URL"
          autoCapitalize="none"
          errorMessage={
            !inputValidities.imageUrl ? "enter a valid image url" : ""
          }
          inputContainerStyle={{
            ...(!inputValidities.imageUrl && {
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
          onBlur={() => updateFormInput(price, "price")}
          onChangeText={t =>
            (/^\d+$/.test(t) ||
              (!isNaN((t as unknown) as number) &&
                t.toString().indexOf(".") != -1) ||
              t === "") &&
            updateFormInput(t, "price")
          }
          keyboardType="number-pad"
          placeholder="Price in $"
          errorMessage={!inputValidities.price ? "enter a valid price" : ""}
          inputContainerStyle={{
            ...(!inputValidities.price && {
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
          onBlur={() => updateFormInput(description, "description")}
          onChangeText={t => updateFormInput(t, "description")}
          placeholder="Description"
          errorMessage={
            !inputValidities.description ? "enter a valid description" : ""
          }
          inputContainerStyle={{
            ...(!inputValidities.description && {
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
              const { description, imageUrl, price, title } = product as Prod;
              if (
                editProduct &&
                product &&
                title.trim() &&
                imageUrl.trim() &&
                price.trim() &&
                description.trim()
              ) {
                editProduct({
                  type: "editProduct",
                  payload: product as Product
                });
                navigation.popToTop();
              }
              const newProduct = navigation.getParam("newProduct");
              if (
                newProduct &&
                product &&
                title.trim() &&
                imageUrl.trim() &&
                price.trim() &&
                description.trim()
              ) {
                newProduct({ type: "addProduct", payload: product as Prod });
                navigation.popToTop();
              }
              if (
                !title.trim() ||
                !imageUrl.trim() ||
                !price.trim() ||
                !description.trim()
              ) {
                Alert.alert("Please enter all values");
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
