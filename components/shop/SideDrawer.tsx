import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import {
  NavigationParams,
  NavigationScreenProp,
  SafeAreaView
} from "react-navigation";
import {
  DrawerContentComponentProps,
  DrawerItems,
  NavigationDrawerState
} from "react-navigation-drawer";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import Colors from "../../constants/Colors";

export interface Logout {
  type: "logout";
}
const logout = async (
  navigation: NavigationScreenProp<NavigationDrawerState, NavigationParams>,
  dispatch: Dispatch<Logout>
) => {
  dispatch({ type: "logout" });
  navigation.navigate("Auth");
  await AsyncStorage.removeItem("userData");
};

const SideDrawer: React.FC<DrawerContentComponentProps> = props => {
  const dispatch = useDispatch();
  return (
    <View>
      <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        <DrawerItems {...props} />
        <Button
          title="Logout"
          onPress={() => logout(props.navigation, dispatch)}
          buttonStyle={styles.btn}
        />
      </SafeAreaView>
    </View>
  );
};

export default SideDrawer;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    width: "90%",
    alignSelf: "center"
  }
});
