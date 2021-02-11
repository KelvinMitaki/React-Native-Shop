import React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Field, reduxForm } from "redux-form";
import FormInput from "../forms/Input";

interface FormValues {
  email: string;
}

const AuthScreen = () => {
  return (
    <KeyboardAvoidingView behavior="padding">
      <View>
        <Field component={FormInput} name="email" />
        <Field component={FormInput} name="password" />
      </View>
    </KeyboardAvoidingView>
  );
};

const validate = (formvalues: FormValues) => {
  const { email } = formvalues;
  const errors = {} as FormValues;
  if (!email || (email && email.trim().length === 0)) {
    errors.email = "Invalid email";
  }

  return errors;
};

export default reduxForm({ form: "AuthScreen", validate })(AuthScreen);

const styles = StyleSheet.create({});
