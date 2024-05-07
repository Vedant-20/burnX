import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Post from "../components/Post";
import axiosInstance from "../axiosInstance/axiosInstance";
import { useDispatch } from "react-redux";
import { postsUpdater } from "../store/postSlice";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const disptach = useDispatch();

  const GetFeedPosts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/posts/feed`);
      // console.log(response, "fedd posts check");
      setPosts(response?.data);
      disptach(postsUpdater(response?.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetFeedPosts();
  }, []);
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.postContainer}>
          {!loading && posts.length === 0 && (
            <Text style={styles.followUsersText}>
              Follow some users to see the feed
            </Text>
          )}

          {loading && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          {/* Map Post Here in component */}
          <ScrollView>
            {posts.map((post, index) => (
              <Post
                key={post._id}
                post={post}
                postedBy={post.postedBy}
                GetFeedPosts={GetFeedPosts}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "column",
    // justifyContent: "center",

    // alignItems: "center",
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
    marginBottom: 40,
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
  },
});
