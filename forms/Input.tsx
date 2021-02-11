import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements";
import { WrappedFieldProps } from "redux-form";

interface Props {
  placeholder: string;
  keyboardType:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad"
    | "decimal-pad"
    | "visible-password"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "name-phone-pad"
    | "twitter"
    | "web-search";
  secureTextEntry?: boolean;
}

const FormInput: React.FC<WrappedFieldProps & Props> = ({
  input: { onChange, ...input },
  meta,
  ...props
}) => {
  return (
    <View>
      <Input
        onChangeText={onChange}
        onBlur={e => input.onBlur(e)}
        onFocus={e => input.onFocus((e as unknown) as React.FocusEvent<any>)}
        errorMessage={meta.touched && meta.error ? meta.error : ""}
        errorStyle={{ fontWeight: "bold", fontSize: 14 }}
        secureTextEntry={props.secureTextEntry}
        {...props}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({});
