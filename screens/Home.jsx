import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Layout from "../components/Layout/Layout";
import Post from "../components/Post";

export default function Home() {
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.postContainer}>
          <Text style={styles.followUsersText}>
            Follow some users to see the feed
          </Text>
          {/* Map Post Here in component */}
          <ScrollView>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </ScrollView>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "column",
    justifyContent: "center",

    alignItems: "center",
    backgroundColor: "#101010",
    height: 800,
  },
  followUsersText: {
    color: "white",
    fontSize: 32,
  },
  postContainer: {
    display: "flex",
    flex: 1,
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
  },
});
