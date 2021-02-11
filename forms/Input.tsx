import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements";
import { WrappedFieldProps } from "redux-form";

interface Props {
  placeholder: string;
}

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
        errorMessage={meta.touched && meta.error ? meta.error : ""}
        errorStyle={{ fontWeight: "bold", fontSize: 14 }}
        placeholder={props.placeholder}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({});
