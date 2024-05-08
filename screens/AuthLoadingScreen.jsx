import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

function AuthLoadingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        if (token) {
          navigation.navigate("people");
        } else {
          navigation.navigate("login");
        }
      } catch (error) {
        console.log("Error checking token:", error);
        navigation.navigate("login");
      }
    };

    checkTokenAndNavigate();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

export default AuthLoadingScreen;
