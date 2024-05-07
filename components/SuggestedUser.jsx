import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import useFollowUnFollow from "../hooks/useFollowUnFollow";

export default function SuggestedUser({ user }) {
  const { handleFollowUnfollow, following, updating } = useFollowUnFollow(user);

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
        {user?.profilePic ? (
          <Image
            source={{
              uri: user?.profilePic,
            }}
            style={{ height: 100, width: 100, borderRadius: 5 }}
          />
        ) : (
          <Image
            source={{
              uri: `https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_640.png`,
            }}
            style={{ height: 100, width: 100 }}
          />
        )}

        <View style={{ marginLeft: 50 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
            {user?.username}
          </Text>
          <Text style={{ color: "#999", fontSize: 16 }}>{user?.name}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleFollowUnfollow}
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
    marginTop: 5,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
});
