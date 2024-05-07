import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGetUserProfile from "../hooks/useGetUserProfile";
import axiosInstance from "../axiosInstance/axiosInstance";
import Layout from "../components/Layout/Layout";
import { formatDistanceToNow } from "date-fns";
import Actions from "../components/Actions";
import Comment from "../components/Comment";

export default function PostScreen({ route }) {
  const { pid, username } = route.params;
  const { user, loading } = useGetUserProfile(username);
  const currentUser = useSelector((state) => state.user.user);
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const GetPost = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${pid}`);
        // console.log(res, "post page data");
        setPosts(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetPost();
  }, [pid]);

  if (!user && loading) {
    return (
      <View style={{ justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <>
      <Layout>
        <ScrollView
          style={{
            backgroundColor: "#101010",
            height: "100%",
            marginBottom: 40,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 20,
            }}
          >
            <Image source={{ uri: user?.profilePic }} style={styles.avatar} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
              >
                {user?.username}
              </Text>
              <Image
                source={{
                  uri: `https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png`,
                }}
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 4,
                  marginRight: 100,
                }}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 12,

                  textAlign: "right",
                  color: "#ccc",
                  marginRight: 10,
                }}
              >
                {posts?.createdAt &&
                  formatDistanceToNow(new Date(posts?.createdAt))}{" "}
                ago
              </Text>
            </View>
          </View>
          <Text
            style={{ marginVertical: 3, color: "white", marginHorizontal: 100 }}
          >
            {posts?.text}
          </Text>
          {posts?.img && (
            <View
              style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 5 }}
            >
              <Image
                source={{ uri: posts?.img }}
                style={{ width: "100%", height: 400 }}
              />
            </View>
          )}
          <View
            style={{
              marginVertical: 4,
              width: "100%",
              height: 1,
              backgroundColor: "#ccc",
            }}
          />
          <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 80 }}>
            <Actions post={posts} />
          </View>
          <View
            style={{
              marginVertical: 4,
              width: "100%",
              height: 1,
              backgroundColor: "#ccc",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                marginLeft: 20,
              }}
            >
              <Text style={{ fontSize: 20 }}>👋</Text>
              <Text style={{ color: "#ccc" }}>
                Get the app to like, reply and post.
              </Text>
            </View>
          </View>

          <View
            style={{
              marginVertical: 4,
            }}
          />

          {posts?.replies?.map((reply, index) => (
            <Comment
              key={reply?._id}
              reply={reply}
              lastReply={index === posts?.replies?.length - 1}
            />
          ))}
        </ScrollView>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginLeft: 20,
  },
});
