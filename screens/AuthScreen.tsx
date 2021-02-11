import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { Button, Card } from "react-native-elements";
import {
  ScrollView,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import { ScreenProps } from "react-native-screens";
import { NavigationRoute, NavigationScreenConfig } from "react-navigation";
import { NavigationStackScreenProps } from "react-navigation-stack";
import {
  StackNavigationOptions,
  StackNavigationProp
} from "react-navigation-stack/lib/typescript/src/vendor/types";
import { useSelector } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import axios from "../axios/axios";
import Colors from "../constants/Colors";
import FormInput from "../forms/Input";
import { Redux } from "../interfaces/Redux";

interface FormValues {
  email: string;
  password: string;
}

const AuthScreen: React.FC<
  InjectedFormProps<FormValues, NavigationStackScreenProps>
> & {
  navigationOptions?: NavigationScreenConfig<
    StackNavigationOptions,
    StackNavigationProp<NavigationRoute, {}>,
    ScreenProps
  >;
} = props => {
  const { form } = useSelector((state: Redux) => state);
  const signup = async () => {
    try {
      const { data } = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.EXPO_FIREBASE}`,
        form.AuthScreen.values
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  props.handleSubmit(f => {
    console.log(f);
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient colors={["#ffedff", "#ffe3ff"]}>
        <View style={styles.prt}>
          <KeyboardAvoidingView behavior="padding" style={{ width: "100%" }}>
            <Card containerStyle={styles.card}>
              <ScrollView>
                <Field
                  component={FormInput}
                  name="email"
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Field
                  component={FormInput}
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                />
                <Button
                  title="Submit"
                  buttonStyle={styles.btn}
                  disabled={props.invalid}
                  onPress={signup}
                />
                <Button
                  title="Switch to sign up"
                  buttonStyle={{
                    ...styles.btn,
                    backgroundColor: Colors.accent,
                    marginTop: 10
                  }}
                />
              </ScrollView>
            </Card>
          </KeyboardAvoidingView>
        </View>
      </LinearGradient>
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

AuthScreen.navigationOptions = {
  headerTitle: "Sign In"
};

export default reduxForm<FormValues, NavigationStackScreenProps>({
  form: "AuthScreen",
  validate
})(AuthScreen);

const styles = StyleSheet.create({
  prt: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    marginBottom: 70
  },
  btn: {
    backgroundColor: Colors.primary,
    alignSelf: "center",
    padding: 10,
    width: "100%"
  }
});
