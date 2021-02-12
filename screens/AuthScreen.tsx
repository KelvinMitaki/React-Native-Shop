import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import axios from "../axios/axios";
import Colors from "../constants/Colors";
import FormInput from "../forms/Input";
import { Redux } from "../interfaces/Redux";

interface FormValues {
  email: string;
  password: string;
}

export interface SignUp {
  type: "signup";
  payload: {
    token: string;
    userId: string;
  };
}
export interface SignIn {
  type: "signin";
  payload: {
    token: string;
    userId: string;
  };
}

const AuthScreen: React.FC<
  InjectedFormProps<
    FormValues,
    NavigationStackScreenProps<{ auth: "signup" | "signin" }>
  > &
    NavigationStackScreenProps<{ auth: "signup" | "signin" }>
> & {
  navigationOptions?: NavigationScreenConfig<
    StackNavigationOptions,
    StackNavigationProp<NavigationRoute, { auth: "signup" | "signin" }>,
    ScreenProps
  >;
} = props => {
  const [loading, setLoading] = useState<boolean>(false);
  const [auth, setAuth] = useState<"signup" | "signin">("signin");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    props.navigation.setParams({ auth });
  }, [auth]);
  const { form } = useSelector((state: Redux) => state);
  const authenticate = async () => {
    try {
      setError(null);
      setLoading(true);
      const {
        data
      } = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${
          auth === "signin" ? "signInWithPassword" : "signUp"
        }?key=${process.env.EXPO_FIREBASE}`,
        { ...form.AuthScreen.values, returnSecureToken: true }
      );
      setLoading(false);
      if (auth === "signin") {
        dispatch<SignIn>({
          type: "signin",
          payload: { token: data.idToken, userId: data.localId }
        });
      } else {
        dispatch<SignUp>({
          type: "signup",
          payload: { token: data.idToken, userId: data.localId }
        });
      }
      props.navigation.navigate("Main");
      console.log(data);
    } catch (error) {
      if (auth === "signin") {
        setError("Invalid email or password");
      } else {
        setError("Email already in use");
      }
      setLoading(false);
      // console.log(error.response.data);
    }
  };
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
                {error && <Text style={styles.error}>{error}</Text>}
                <Button
                  title={auth === "signin" ? "Sign In" : "Sign Up"}
                  buttonStyle={styles.btn}
                  disabled={props.invalid}
                  onPress={authenticate}
                  loading={loading}
                />
                <Button
                  title={`Switch to ${
                    auth === "signup" ? "Sign in" : "Sign up"
                  }`}
                  buttonStyle={{
                    ...styles.btn,
                    backgroundColor: Colors.accent,
                    marginTop: 10
                  }}
                  onPress={() =>
                    setAuth(au => (au === "signin" ? "signup" : "signin"))
                  }
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

AuthScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("auth") === "signin" ? "Sign In" : "Sign Up"
});

export default reduxForm<
  FormValues,
  NavigationStackScreenProps<{ auth: "signup" | "signin" }>
>({
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
  },
  error: {
    color: "red",
    fontWeight: "bold",
    paddingHorizontal: 15,
    transform: [{ translateY: -20 }]
  }
});
