import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import People from "./screens/People";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import UpdateProfile from "./screens/UpdateProfile";
import { useEffect } from "react";
import axiosInstance from "./axiosInstance/axiosInstance";
import { userProfileUpdater } from "./store/userSlice";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// routes
const Stack = createNativeStackNavigator();

export default function App() {
  // const dispatch = useDispatch();
  const navigation = useNavigation();

  const AutomaticLoginUser = async () => {
    try {
      const token = AsyncStorage.getItem("jwtToken");

      if (token) {
        navigation.navigate("home");
      }
    } catch (error) {
      navigation.navigate("login");
    }
  };

  const GetCurrentUser = async () => {
    try {
      const response = await axiosInstance.get(`/users/get-current-user`);
      console.log("Get current user", response);
      // dispatch(userProfileUpdater(response?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AutomaticLoginUser();
    GetCurrentUser();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="people"
          component={People}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="updateprofile"
          component={UpdateProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
