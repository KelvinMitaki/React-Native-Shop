import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Colors from "../../constants/Colors";
import Order from "../../models/Order";
import CartItemComponent from "./CartItem";

const OrderItem: React.FC<Order> = React.memo(order => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  return (
    <View style={styles.order}>
      <View style={styles.details}>
        <Text style={styles.amt}>
          ${parseFloat((order.totalAmount as unknown) as string).toFixed(2)}
        </Text>
        <Text style={styles.date}>{new Date(order.date).toDateString()}</Text>
      </View>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        buttonStyle={{ backgroundColor: Colors.primary, alignSelf: "center" }}
        onPress={() => setShowDetails(show => !show)}
      />
      {showDetails &&
        order.items.map(item => (
          <CartItemComponent {...item} key={item.id} hideDelete />
        ))}
    </View>
  );
});

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
