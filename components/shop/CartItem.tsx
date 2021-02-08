import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CartItem } from "../../redux/reducers/cartReducer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const CartItemComponent: React.FC<CartItem> = it => {
  return (
    <View style={styles.item}>
      <View style={styles.left}>
        <Text style={styles.qty}>{it.quantity}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {it.title}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>${it.price}</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="delete"
            color="red"
            size={23}
            style={{ paddingLeft: 10 }}
            onPress={() => {}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItemComponent;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    paddingVertical: 10
  },
  left: {
    flexDirection: "row",
    alignItems: "center"
  },
  right: {
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    width: "60%"
  },
  qty: {
    fontSize: 20,
    color: "#999",
    marginRight: 10
  },
  price: {
    fontWeight: "bold",
    fontSize: 20
  }
});
