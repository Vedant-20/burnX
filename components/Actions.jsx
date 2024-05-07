import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axiosInstance from "../axiosInstance/axiosInstance";
import { ToastMessage } from "./Toast";
import { useSelector } from "react-redux";

export default function Actions({ post, GetFeedPosts }) {
  const user = useSelector((state) => state.user.user);
  const [liked, setLiked] = useState(post?.likes?.includes(user?._id));
  const [modalVisible, setModalVisible] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [reply, setReply] = useState("");
  const postState = useSelector((state) => state.post.posts);
  const [posts, setPosts] = useState(postState);
  const handleReply = async () => {
    try {
      const response = await axiosInstance.put(`/posts/reply/${post?._id}`, {
        text: reply,
      });
      ToastMessage.showSuccessMessage("Replied Successfully");
      GetFeedPosts();
      setModalVisible(false);
      setReply("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeandUnlike = async () => {
    try {
      setIsLiking(true);
      const res = await axiosInstance.put(`/posts/like/${post?._id}`);

      if (!liked) {
        const updatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            return { ...p, likes: [...p.likes, user._id] };
          }
          return p;
        });
        setPosts(updatedPosts);
      } else {
        const updatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            return { ...p, likes: p.likes.filter((id) => id !== user._id) };
          }
          return p;
        });
        setPosts(updatedPosts);
      }
      setLiked(!liked);

      {
        liked
          ? ToastMessage.showSuccessMessage("Unliked Successfully")
          : ToastMessage.showSuccessMessage("Liked Successfully");
      }

      GetFeedPosts();
    } catch (error) {
      console.log(error);
      ToastMessage.showErrorMessage("Error while liking");
    } finally {
      setIsLiking(false);
    }
  };
  return (
    <View style={{ flexDirection: "column" }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          marginBottom: 5,
          display: "flex",
          gap: 80,
        }}
      >
        <TouchableOpacity onPress={handleLikeandUnlike}>
          <FontAwesome5
            name="fire-alt"
            size={25}
            color={liked ? "orange" : "#fff"}
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible((prev) => !prev)}>
          <FontAwesome5
            name="comment"
            size={25}
            color="white"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="share" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}
      >
        {post?.replies?.length === 0 && (
          <Text style={{ textAlign: "center" }}>🥱</Text>
        )}
        {post?.replies?.length !== 0 && (
          <Text style={{ fontSize: 12, color: "#999", marginRight: 5 }}>
            {post?.replies?.length} replies
          </Text>
        )}
        <View
          style={{
            width: 1,
            height: 15,
            backgroundColor: "#ccc",
            marginHorizontal: 5,
          }}
        />
        <Text style={{ fontSize: 12, color: "#999", marginRight: 5 }}>
          {post?.likes?.length} likes
        </Text>
      </View>
      {modalVisible && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "#101010",
              borderWidth: 1,
              borderColor: "yellow",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <TextInput
              placeholder="Reply goes here..."
              placeholderTextColor={"white"}
              value={reply}
              onChangeText={(text) => setReply(text)}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 10,
                color: "white",
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#007bff",
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={handleReply}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
