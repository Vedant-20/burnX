import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import Layout from "../components/Layout/Layout";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const navigation = useNavigation();
  return (
    <Layout>
      <View style={styles.container}>
        <View style={{ top: 0, position: "relative" }}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_640.png",
            }}
            style={styles.profilePic}
          />
        </View>

        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.username}>@johndoe</Text>
        <Text style={styles.bio}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          consequat justo nec velit elementum, eu mattis ligula dapibus.
        </Text>
        <View style={styles.followersContainer}>
          <Text style={styles.followersCount}>1.5k followers</Text>
          <Text style={styles.followingCount}>800 following</Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "#007bff",
              padding: 10,
              borderRadius: 5,
              marginTop: 40,
            }}
            onPress={() => {}}
          >
            <Text
              style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}
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
              marginTop: 40,
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
