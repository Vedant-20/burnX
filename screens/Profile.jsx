import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";

import Layout from "../components/Layout/Layout";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { ToastMessage } from "../components/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userProfileUpdater } from "../store/userSlice";
import axiosInstance from "../axiosInstance/axiosInstance";

export default function Profile() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("jwtToken");
      ToastMessage.showSuccessMessage("Logged Out Successfully");
      dispatch(userProfileUpdater(null));
      navigation.navigate("login");
    } catch (error) {
      ToastMessage.showErrorMessage("Something went wrong");
      console.log(error);
      navigation.navigate("login");
    }
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

  useEffect(() => {
    GetCurrentUser();
  }, []);

  return (
    <Layout>
      <View style={styles.container}>
        <View style={{ top: 0, position: "relative" }}>
          {user?.profilePic ? (
            <Image src={user?.profilePic} style={styles.profilePic} />
          ) : (
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_640.png",
              }}
              style={styles.profilePic}
            />
          )}
        </View>

        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.username}>@{user?.username}</Text>
        <Text style={styles.bio}>{user?.bio}</Text>
        <View style={styles.followersContainer}>
          <Text style={styles.followersCount}>
            {user?.followers?.length} followers
          </Text>
          <Text style={styles.followingCount}>
            {user?.following?.length} following
          </Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#007bff",
                padding: 10,
                borderRadius: 5,
                marginTop: 20,
              }}
              onPress={() => {}}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Freeze Account
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#90EE90",
                padding: 10,
                borderRadius: 5,
                marginTop: 20,
              }}
              onPress={() => {
                navigation.navigate("updateprofile");
              }}
            >
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Update Profile
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "crimson",
                padding: 10,
                borderRadius: 5,
                marginTop: 20,
              }}
              onPress={handleLogout}
            >
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // justifyContent: "center",
    padding: 20,
    backgroundColor: "#101010",
    height: "100%",
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "white",
    objectFit: "fill",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  username: {
    fontSize: 18,
    marginBottom: 10,
    color: "#ccc",
  },
  bio: {
    textAlign: "center",
    marginBottom: 20,
    color: "#ccc",
  },
  followersContainer: {
    flexDirection: "row",
  },
  followersCount: {
    marginRight: 10,
    color: "white",
  },
  followingCount: {
    marginLeft: 10,
    color: "white",
  },
});
