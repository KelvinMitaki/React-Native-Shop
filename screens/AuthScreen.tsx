import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { Button } from "react-native-elements";
import {
  ScrollView,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import Colors from "../constants/Colors";
import FormInput from "../forms/Input";

interface FormValues {
  email: string;
  password: string;
}

const AuthScreen: React.FC<InjectedFormProps<FormValues>> = props => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.prt}>
        <KeyboardAvoidingView behavior="padding" style={{ width: "100%" }}>
          <ScrollView style={styles.inpPrt}>
            <Field component={FormInput} name="email" placeholder="Email" />
            <Field
              component={FormInput}
              name="password"
              placeholder="Password"
            />
            <Button
              title="Submit"
              buttonStyle={styles.btn}
              disabled={props.invalid}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const validate = (formvalues: FormValues) => {
  const { email, password } = formvalues;
  const errors = {} as FormValues;
  if (!email || (email && email.trim().length === 0)) {
    errors.email = "Invalid email";
  }
  if (!password || (password && password.trim().length < 6)) {
    errors.password = "Password must be six characters minimum";
  }

  return errors;
};

export default reduxForm<FormValues>({ form: "AuthScreen", validate })(
  AuthScreen
);

const styles = StyleSheet.create({
  prt: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  inpPrt: {
    marginBottom: 70
  },
  btn: {
    backgroundColor: Colors.primary,
    alignSelf: "center",
    padding: 10,
    width: "60%"
  }
});
