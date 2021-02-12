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
import Colors from "../../constants/Colors";

export interface Logout {
  type: "logout";
}
const logout = async (
  navigation: NavigationScreenProp<NavigationDrawerState, NavigationParams>
) => {
  navigation.navigate("Auth");
  await AsyncStorage.removeItem("userData");
};

const SideDrawer: React.FC<DrawerContentComponentProps> = props => {
  return (
    <View>
      <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
        <DrawerItems {...props} />
        <Button
          title="Logout"
          onPress={() => logout(props.navigation)}
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
