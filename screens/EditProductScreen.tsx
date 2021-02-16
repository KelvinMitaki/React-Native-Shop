import React, { useEffect, useReducer, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button, Input } from "react-native-elements";
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
import axios from "../axios/axios";
import AsyncStorage from "@react-native-community/async-storage";
import * as Notifications from "expo-notifications";

interface Prod {
  title: string;
  imageUrl: string;
  price: string;
  description: string;
  ownerId: "u1";
  id?: string;
  ownerPushToken?: string;
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
  formIsValid?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setError?: React.Dispatch<React.SetStateAction<string | null>>;
  token?: string | null;
  userId?: string | null;
}> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {
    products,
    auth: { token, userId }
  } = useSelector((state: Redux) => state);
  const product = products.userProducts.find(
    p => p.id === navigation.getParam("productId")
  );
  const dispatch = useDispatch();
  const [state, reactDispatch] = useReducer(reducer, {
    inputValues: {
      title: product?.title || "",
      price: product?.price.toString() || "",
      imageUrl: product?.imageUrl || "",
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
  useEffect(() => {
    navigation.setParams({ setLoading, setError, token, userId });
  }, [loading, setLoading, error, setError]);
  useEffect(() => {
    if (!product) {
      // NEW PRODUCT
      navigation.setParams({ newProduct: dispatch, formIsValid });
      navigation.setParams({
        product: { title, description, imageUrl, price, ownerId: "u1" }
      });
    } else {
      // EDIT PRODUCT
      navigation.setParams({
        product: {
          ...product,
          title,
          description,
          imageUrl,
          price,
          ownerId: "u1"
        }
      });
      navigation.setParams({ editProduct: dispatch, formIsValid });
    }
  }, [title, description, imageUrl, price, formIsValid]);
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
          style={{ fontSize: 20, fontWeight: "bold", color: Colors.primary }}
        >
          {error}
        </Text>
        <Button
          title="Try Again"
          onPress={() => navigation.popToTop()}
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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
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
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
            onPress={async () => {
              const editProduct = navigation.getParam("editProduct");
              const product = navigation.getParam("product");
              const formIsValid = navigation.getParam("formIsValid");
              const setLoading = navigation.getParam("setLoading");
              const setError = navigation.getParam("setError");
              const token = navigation.getParam("token");
              const userId = navigation.getParam("userId");
              if (
                editProduct &&
                product &&
                formIsValid &&
                setLoading &&
                setError
              ) {
                try {
                  setLoading(true);
                  setError(null);
                  const res = await Notifications.getExpoPushTokenAsync();
                  await axios.patch(
                    `/products/${product.id}.json?auth=${token}`,
                    { ...product, ownerId: userId, ownerPushToken: res.data }
                  );
                  editProduct({
                    type: "editProduct",
                    payload: {
                      ...product,
                      ownerId: userId,
                      ownerPushToken: res.data
                    } as Product
                  });
                  navigation.popToTop();
                  setLoading(false);
                } catch (error) {
                  setLoading(false);
                  setError("Error editing product");
                  console.log(error);
                  if (error.response.status === 401) {
                    await AsyncStorage.removeItem("userData");
                    navigation.navigate("Auth");
                  }
                }
              }
              const newProduct = navigation.getParam("newProduct");
              const status = await Notifications.requestPermissionsAsync();
              if (
                newProduct &&
                product &&
                formIsValid &&
                setLoading &&
                setError &&
                status.granted
              ) {
                try {
                  setLoading(true);
                  setError(null);
                  const res = await Notifications.getExpoPushTokenAsync();
                  const { data } = await axios.post(
                    `/products.json?auth=${token}`,
                    {
                      ...product,
                      ownerId: userId,
                      ownerPushToken: res.data
                    }
                  );
                  newProduct({
                    type: "addProduct",
                    payload: {
                      ...product,
                      id: data.name,
                      ownerPushToken: res.data
                    } as Prod
                  });
                  navigation.popToTop();
                  setLoading(false);
                } catch (error) {
                  setLoading(false);
                  setError("Error adding product");
                  console.log(error);
                  if (error.response.status === 401) {
                    await AsyncStorage.removeItem("userData");
                    navigation.navigate("Auth");
                  }
                }
              } else {
                setError && setError("Error adding product");
              }
              if (!formIsValid) {
                Alert.alert("Please fill in all form values");
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
