import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

const AddProductScreen: NavigationStackScreenComponent = () => {
  return (
    <View>
      <Text>AddProductScreen AddProductScreen</Text>
    </View>
  );
};

AddProductScreen.navigationOptions = {
  headerTitle: "Add A New Product"
};

export default AddProductScreen;

const styles = StyleSheet.create({});
