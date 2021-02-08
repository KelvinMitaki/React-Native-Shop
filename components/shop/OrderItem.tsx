import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Colors from "../../constants/Colors";
import Order from "../../models/Order";

const OrderItem: React.FC<Order> = order => {
  return (
    <View style={styles.order}>
      <View style={styles.details}>
        <Text style={styles.amt}>${order.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{order.date.toDateString()}</Text>
      </View>
      <Button
        title="Show Details"
        buttonStyle={{ backgroundColor: Colors.primary, alignSelf: "center" }}
      />
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  order: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 8,
    elevation: 10,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 5,
    padding: 10
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  amt: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold"
  },
  date: {
    fontSize: 20,
    marginBottom: 10,
    color: "#999"
  },
  btn: {}
});
