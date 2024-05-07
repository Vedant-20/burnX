import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import Layout from "../components/Layout/Layout";
import SuggestedUser from "../components/SuggestedUser";
import axiosInstance from "../axiosInstance/axiosInstance";

export default function People() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const GetSuggestedUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/users/suggested`);
      // console.log(response, "Peopls scereen");
      setData(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetSuggestedUsers();
  }, []);
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>Suggested Users</Text>
        {loading && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <View style={styles.userContainer}>
          {/* map the suggested user data in suggested user component */}
          <ScrollView>
            {data.map((user, index) => (
              <SuggestedUser key={user?._id} user={user} />
            ))}
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
