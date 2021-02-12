import AsyncStorage from "@react-native-community/async-storage";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationSwitchScreenComponent } from "react-navigation";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { SignIn } from "./AuthScreen";

const StartUpScreen: NavigationSwitchScreenComponent = ({ navigation }) => {
  const dispatch = useDispatch();
  const getAuth = useCallback(async () => {
    const data = await AsyncStorage.getItem("userData");
    if (data) {
      const userData = JSON.parse(data);
      if (new Date(userData.expiryDate).getTime() > Date.now()) {
        const { token, userId } = userData;
        dispatch<SignIn>({ type: "signin", payload: { token, userId } });
        return navigation.navigate("Main");
      } else {
        await AsyncStorage.removeItem("userData");
        navigation.navigate("Auth");
      }
    } else {
      navigation.navigate("Auth");
    }
  }, []);
  useEffect(() => {
    getAuth();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default StartUpScreen;

const styles = StyleSheet.create({});
