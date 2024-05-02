import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Layout from "../components/Layout/Layout";
import SuggestedUser from "../components/SuggestedUser";

export default function People() {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>Suggested Users</Text>
        <View style={styles.userContainer}>
          {/* map the suggested user data in suggested user component */}
          <ScrollView>
            <SuggestedUser />
          </ScrollView>
        </View>

        {/* if loading true show loader */}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginLeft: 100,
  },
  container: {
    flexDirection: "col",

    backgroundColor: "#101010",
    height: 800,
  },
  userContainer: {
    flexDirection: "column",
    gap: 4,
  },
});
