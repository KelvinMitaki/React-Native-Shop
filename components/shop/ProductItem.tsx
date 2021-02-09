import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import { Button, Image, Overlay } from "react-native-elements";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import Product from "../../models/Product";
import { AddToCart } from "../../screens/ProductsOverviewScreen";
import ConfirmDelete from "./ConfirmDelete";

interface Props {
  isAdmin?: boolean;
}

const ProductItem: React.FC<Product & NavigationInjectedProps & Props> = ({
  navigation,
  isAdmin,
  ...prod
}) => {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const dispatch = useDispatch();
  let Touchable;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    Touchable = TouchableNativeFeedback;
  } else {
    Touchable = TouchableOpacity;
  }
  return (
    // @ts-ignore
    <Touchable
      background={TouchableNativeFeedback.Ripple("#ccc", false)}
      useForeground
      onPress={() =>
        !isAdmin &&
        navigation.navigate("ProductDetails", {
          productId: prod.id,
          title: prod.title
        })
      }
    >
      <View style={styles.product}>
        <ConfirmDelete
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          {...prod}
        />
        <Image source={{ uri: prod.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{prod.title}</Text>
        <Text style={styles.price}>
          ${prod.price.toFixed(2).toLocaleString()}
        </Text>
        <View style={styles.btnPrt}>
          {isAdmin ? (
            <>
              <Button
                buttonStyle={{ backgroundColor: Colors.primary }}
                containerStyle={styles.btn}
                title="Edit"
                onPress={() =>
                  navigation.navigate("EditProduct", {
                    productId: prod.id,
                    title: prod.title
                  })
                }
              />
              <Button
                buttonStyle={{ backgroundColor: Colors.primary }}
                containerStyle={styles.btn}
                title="Delete"
                onPress={() => setConfirmDelete(true)}
              />
            </>
          ) : (
            <>
              <Button
                buttonStyle={{ backgroundColor: Colors.primary }}
                containerStyle={styles.btn}
                title="View Details"
                onPress={() =>
                  navigation.navigate("ProductDetails", {
                    productId: prod.id,
                    title: prod.title
                  })
                }
              />
              <Button
                buttonStyle={{ backgroundColor: Colors.primary }}
                containerStyle={styles.btn}
                title="To Cart"
                onPress={() =>
                  dispatch<AddToCart>({ type: "addToCart", payload: prod })
                }
              />
            </>
          )}
        </View>
      </View>
    </Touchable>
  );
};

export default withNavigation(ProductItem);

const styles = StyleSheet.create({
  product: {
    margin: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 8,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: 200
  },
  btnPrt: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  btn: {
    width: "40%",
    paddingVertical: 20
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    marginLeft: 10
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginLeft: 10
  }
});
