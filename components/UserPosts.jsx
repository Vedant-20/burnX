import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Actions from "./Actions";
import axiosInstance from "../axiosInstance/axiosInstance";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ToastMessage } from "./Toast";

export default function UserPosts({ post, postedBy, GetPosts }) {
  const currentUser = useSelector((state) => state.user.user);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const GetPostUser = async () => {
    try {
      const response = await axiosInstance.get(`/users/profile/${postedBy}`);
      // console.log(response, "post owner");
      setUser(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const DeletePost = async () => {
    try {
      const res = await axiosInstance.delete(`/posts/${post?._id}`);
      ToastMessage.showSuccessMessage("Post Deleted Successfully");
      GetPosts();
    } catch (error) {
      console.log(error);
      ToastMessage.showErrorMessage("Error while Deleting post");
    }
  };

  useEffect(() => {
    GetPostUser();
  }, []);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("postscreen", {
          pid: post?._id,
          username: user?.username,
        })
      }
    >
      <View style={styles.postContainer}>
        <View style={styles.avatarContainer}>
          {user?.profilePic ? (
            <Image src={user?.profilePic} style={styles.avatar} />
          ) : (
            <Image
              source={{
                uri: `https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_640.png`,
              }}
              style={styles.avatar}
            />
          )}

          {post?.replies.length !== 0 && post?.img && (
            <View
              style={{
                width: 1,
                height: 250,
                backgroundColor: "#007FFF",
                marginVertical: 5,
              }}
            />
          )}
          {post?.replies.length !== 0 && post?.img === "" && (
            <View
              style={{
                width: 1,
                height: 50,
                backgroundColor: "#007FFF",
                marginVertical: 5,
              }}
            />
          )}
          <View style={{ position: "relative", width: "100%" }}>
            {post?.replies[0] && (
              <Image
                src={post.replies[0].userProfilePic}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 25,
                  marginLeft: 20,
                }}
              />
            )}
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
                {user?.username}
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
                {formatDistanceToNow(new Date(post?.createdAt))} ago
              </Text>
              {currentUser?._id === user?._id && (
                <TouchableOpacity onPress={DeletePost}>
                  <FontAwesome
                    style={{ fontSize: 25 }}
                    name="trash"
                    color={"red"}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text style={{ fontSize: 14, color: "white" }}>{post.text}</Text>
          <View
            style={{
              borderRadius: 6,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "#ccc",
              marginVertical: 5,
            }}
          >
            {post?.img && (
              <Image src={post?.img} style={{ width: "100%", height: 200 }} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
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
