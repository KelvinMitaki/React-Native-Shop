import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Overlay } from "react-native-elements";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import Product from "../../models/Product";
import { DeleteItem } from "../../screens/UserProductsScreen";

interface Props {
  confirmDelete: boolean;
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmDelete: React.FC<Props & Product> = ({
  confirmDelete,
  setConfirmDelete,
  title,
  id,
  ownerId
}) => {
  const dispatch = useDispatch();
  return (
    <Overlay
      isVisible={confirmDelete}
      onBackdropPress={() => setConfirmDelete(false)}
    >
      <View>
        <Text>Are You Sure You Want To Delete {title}?</Text>
        <View style={styles.btnPrt}>
          <Button
            title="Cancel"
            buttonStyle={styles.btn}
            containerStyle={{ width: "40%" }}
            onPress={() => setConfirmDelete(false)}
          />
          <Button
            title="Confirm"
            buttonStyle={styles.btn}
            containerStyle={{ width: "40%" }}
            onPress={() => {
              dispatch<DeleteItem>({
                type: "deleteItem",
                payload: {
                  id,
                  ownerId
                }
              });
              setConfirmDelete(false);
            }}
          />
        </View>
      </View>
    </Overlay>
  );
};

export default ConfirmDelete;

const styles = StyleSheet.create({
  btnPrt: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  btn: {
    backgroundColor: Colors.primary
  }
});
