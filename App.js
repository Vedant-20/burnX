import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import Toast, { BaseToast } from "react-native-toast-message";
import CreatePost from "./screens/CreatePost";
import PostScreen from "./screens/PostScreen";
import UserChatScreen from "./screens/UserChatScreen";
import MessageScreen from "./screens/MessageScreen";
import { SocketContextProvider } from "./context/SocketContext";
import Context from "./context/Context";

// routes
const Stack = createNativeStackNavigator();

function App() {
  const dispatch = useDispatch();

  const toastConfig = {
    success: ({ ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: "#ccc", backgroundColor: "#4fbf26" }}
        text1Style={{
          fontWeight: "600",
          fontSize: 20,
          color: "white",
        }}
      />
    ),
    error: ({ ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: "#ccc", backgroundColor: "#ff5349" }}
        text1Style={{
          fontWeight: "500",
        }}
      />
    ),
  };

  const GetCurrentUser = async () => {
    try {
      const response = await axiosInstance.get(`/users/get-current-user`);
      // console.log("Get current user", response);
      dispatch(userProfileUpdater(response?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const GetFeedPosts = async () => {
    try {
      const response = await axiosInstance.get(`/posts/feed`);
      // console.log(response, "fedd posts check");

      dispatch(postsUpdater(response?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetCurrentUser();
    GetFeedPosts();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading">
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthLoading"
          component={AuthLoadingScreen}
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
        <Stack.Screen
          name="createpost"
          component={CreatePost}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="postscreen"
          component={PostScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="userchatscreen"
          component={UserChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="messagescreen"
          component={MessageScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Toast autoHide visibilityTime={1000} config={toastConfig} />
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      {/* <Context.Provider value={{ GetFeedPosts }}> */}
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
      {/* </Context.Provider> */}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
