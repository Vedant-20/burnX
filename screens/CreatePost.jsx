import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { imageToBase64 } from "../hooks/imageToBase64";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker";
import axiosInstance from "../axiosInstance/axiosInstance";
import { useSelector } from "react-redux";
import { ToastMessage } from "../components/Toast";

const MAX_CHAR = 500;

export default function CreatePost() {
  const user = useSelector((state) => state.user.user);
  const navigation = useNavigation();
  const [postText, setPostText] = useState("");
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const [imgUrl, setImgUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleTextChange = (text) => {
    if (text.length > MAX_CHAR) {
      const truncatedText = text.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0);
    } else {
      setPostText(text);
      setRemainingChar(MAX_CHAR - text.length);
    }
  };

  const UserDocumentPick = async () => {
    try {
      const image = await DocumentPicker.getDocumentAsync({ type: "image/*" });

      const imageFile = await image.assets[0].uri;

      const base64 = await imageToBase64(imageFile);

      const finalImg = "data:image/jpeg;base64," + base64;
      setImgUrl(finalImg);
    } catch (error) {
      console.log(error, "Eroor in document pciker");
    }
  };

  const handleSubmit = async () => {
    setUploading(true);
    try {
      const response = await axiosInstance.post(`/posts/create`, {
        postedBy: user?._id,
        text: postText,
        img: imgUrl,
      });
      // console.log(response, "create psot");
      setUploading(false);
      ToastMessage.showSuccessMessage("Post Created Successfully");
      navigation.navigate("home");
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
          Create Post
        </Text>
        <KeyboardAvoidingView>
          <View>
            <TextInput
              placeholder="Post content goes here.."
              placeholderTextColor={"white"}
              onChangeText={handleTextChange}
              value={postText}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 40,
                marginVertical: 10,
                color: "white",
              }}
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                textAlign: "right",
                margin: 5,
                color: "#ccc",
              }}
            >
              {remainingChar}/{MAX_CHAR}
            </Text>
            <TouchableOpacity
              style={{ marginLeft: 5, marginTop: 5 }}
              onPress={UserDocumentPick}
            >
              <FontAwesome
                name="image"
                size={70}
                style={{ textAlign: "center" }}
                color={"#ccc"}
              />
            </TouchableOpacity>
          </View>
          {imgUrl && (
            <View style={{ marginTop: 5, width: "100%", position: "relative" }}>
              <ImageBackground
                source={{ uri: imgUrl }}
                style={{ width: "100%", height: 200, marginRight: 370 }}
              />
            </View>
          )}

          <TouchableOpacity
            style={{
              backgroundColor: "#0BDA51",
              padding: 10,
              borderRadius: 5,
              marginVertical: 20,
              marginLeft: 30,
              alignItems: "center",

              width: 300,
              height: 50,
            }}
            onPress={handleSubmit}
            disabled={uploading}
          >
            <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
              {uploading ? "Uploading..." : "Post"}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // justifyContent: "center",
    padding: 20,
    backgroundColor: "#101010",
    height: "100%",
  },
});
