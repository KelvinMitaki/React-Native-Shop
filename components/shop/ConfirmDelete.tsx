import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Overlay } from "react-native-elements";
import { useDispatch } from "react-redux";
import axios from "../../axios/axios";
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
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  return (
    <Overlay isVisible={confirmDelete}>
      <View>
        <Text>
          Are You Sure You Want To Delete{" "}
          <Text style={{ fontWeight: "bold" }}>{title}</Text>?
        </Text>
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
            loading={loading}
            onPress={async () => {
              try {
                setLoading(true);
                await axios.delete(`/products/${id}.json`);
                dispatch<DeleteItem>({
                  type: "deleteItem",
                  payload: {
                    id,
                    ownerId
                  }
                });
                setLoading(false);
                setConfirmDelete(false);
              } catch (error) {
                setLoading(false);
                setConfirmDelete(false);
                console.log(error);
              }
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
