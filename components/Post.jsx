import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Actions from "./Actions";

export default function Post() {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.postContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: `https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_640.png`,
            }}
            style={styles.avatar}
          />

          <View
            style={{
              width: 1,
              height: 250,
              backgroundColor: "#007FFF",
              marginVertical: 5,
            }}
          />
          <View style={{ position: "relative", width: "100%" }}>
            <Image
              source={{
                uri: `https://cdn4.sharechat.com/samanthaprofilephotos_30a36964_1612287686205_sc_cmprsd_40.jpg?tenant=sc&referrer=tag-service&f=rsd_40.jpg`,
              }}
              style={{
                height: 20,
                width: 20,
                borderRadius: 25,
                marginLeft: 20,
              }}
            />
          </View>
        </View>
        <View
          style={{ flex: 1, flexDirection: "column", paddingHorizontal: 10 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center", // Align items to center vertically
              marginBottom: 5, // Add margin bottom to create space between username and timestamp
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  marginRight: 5,
                  color: "white",
                }}
              >
                username
              </Text>
              <Image
                source={{
                  uri: `https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png`,
                }}
                style={{ width: 16, height: 16 }}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 12,
                  color: "#999",
                  textAlign: "right",
                  marginRight: 10,
                }}
              >
                5 hours ago
              </Text>
              <FontAwesome
                style={{ fontSize: 25 }}
                name="trash"
                color={"red"}
              />
            </View>
          </View>
          <Text style={{ fontSize: 14, color: "white" }}>Post Text</Text>
          <View
            style={{
              borderRadius: 6,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "#ccc",
              marginVertical: 5,
            }}
          >
            <Image
              source={{
                uri: `https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/10/the-eminence-in-shadow-1.jpg`,
              }}
              style={{ width: "100%", height: 200 }}
            />
          </View>
          <Actions />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: "row",
    marginBottom: 10,
    paddingVertical: 10,
    backgroundColor: "transparent",
    borderRadius: 1,
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    width: "100%",
  },
  avatarContainer: {
    alignItems: "center",
    marginRight: 10,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
