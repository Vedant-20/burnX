import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  return (
    <View style={styles.container}>
      {/* <ScrollView automaticallyAdjustKeyboardInsets={true}> */}
      {loading && <Text>Loading.......</Text>}
      <Formik
        initialValues={{ password: "", username: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          // console.log(values);
          setData(values);

          setLoading(true);
          try {
            const response = await axios.post(
              `${process.env.EXPO_PUBLIC_API_URL}/users/login`,
              values
            );

            await AsyncStorage.setItem("jwtToken", response?.data?.token);
            setLoading(false);
            navigation.navigate("home");
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <Text style={styles.loginImage}>🔥</Text>
            <Text style={styles.title}>Login</Text>

            <InputField
              label={"Username"}
              keyboardType="default"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              error={errors.username}
              touched={touched.username}
            />

            <InputField
              label={"Password"}
              inputType="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={errors.password}
              touched={touched.password}
            />

            <CustomButton
              isLoading={loader}
              label={"Login"}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
      <TouchableOpacity
        onPress={() => navigation.navigate("signup")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "yellow" }}>Don't have an account? SignUp</Text>
      </TouchableOpacity>
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#101010",
  },
  form: {
    width: "80%",
  },
  title: {
    // fontFamily: "Roboto-Medium",
    fontSize: 28,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  loginImage: {
    alignSelf: "center",
    marginBottom: 30,
    fontSize: 100,
  },
});
