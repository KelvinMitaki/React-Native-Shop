import AsyncStorage from "@react-native-community/async-storage";
import React, { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationSwitchScreenComponent } from "react-navigation";

const StartUpScreen: NavigationSwitchScreenComponent = ({ navigation }) => {
  const getAuth = useCallback(async () => {
    const data = await AsyncStorage.getItem("userData");
    if (data) {
      navigation.navigate("Main");
    } else {
      navigation.navigate("Auth");
    }
  }, []);
  useEffect(() => {
    getAuth();
  }, []);
  return <React.Fragment></React.Fragment>;
};

export default StartUpScreen;

const styles = StyleSheet.create({});
