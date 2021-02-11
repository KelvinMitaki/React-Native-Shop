import React from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements";
import { WrappedFieldProps } from "redux-form";

interface Props {}

const FormInput: React.FC<WrappedFieldProps & Props> = ({
  input,
  meta,
  ...props
}) => {
  return (
    <View>
      <Input
        onChangeText={input.onChange}
        {...input}
        onFocus={e => input.onFocus((e as unknown) as React.FocusEvent<any>)}
        onBlur={e => {
          input.onBlur(e);
          Keyboard.dismiss();
        }}
        errorMessage={meta.touched && meta.error ? meta.error : ""}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({});
