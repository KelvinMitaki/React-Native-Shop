import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Overlay } from "react-native-elements";

interface Props {
  confirmDelete: boolean;
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const ConfirmDelete: React.FC<Props> = ({
  confirmDelete,
  setConfirmDelete,
  title
}) => {
  return (
    <Overlay
      isVisible={confirmDelete}
      onBackdropPress={() => setConfirmDelete(false)}
    >
      <View>
        <Text>Are You Sure You Want To Delete {title}</Text>
        <View>
          <Button title="Confirm" />
          <Button title="Cancel" />
        </View>
      </View>
    </Overlay>
  );
};

export default ConfirmDelete;

const styles = StyleSheet.create({});
