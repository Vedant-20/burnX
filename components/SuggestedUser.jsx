import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function SuggestedUser() {
  const following = false;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 30,
        }}
        onPress={() => {}}
      >
        <Image
          source={{
            uri: `https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_640.png`,
          }}
          style={{ height: 100, width: 100 }}
        />

        <View style={{ marginLeft: 50 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
            Username
          </Text>
          <Text style={{ color: "#999", fontSize: 16 }}>Name</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {}}
        style={{
          backgroundColor: following ? "white" : "#007bff",
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 5,
        }}
      >
        <Text
          style={{ color: following ? "#000" : "#fff", fontWeight: "bold" }}
        >
          {following ? "Unfollow" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
});
