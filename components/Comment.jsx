import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Comment({ reply, lastReply }) {
  return (
    <>
      <View style={styles.container}>
        <Image source={{ uri: reply?.userProfilePic }} style={styles.avatar} />
        <View style={styles.commentContainer}>
          <Text style={styles.username}>{reply?.username}</Text>
          <Text style={{ color: "white" }}>{reply?.text}</Text>
        </View>
      </View>
      {!lastReply && <View style={styles.divider} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginVertical: 10,
    marginLeft: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContainer: {
    flex: 1,
    flexDirection: "column",
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
