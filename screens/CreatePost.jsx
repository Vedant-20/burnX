import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { imageToBase64 } from "../hooks/imageToBase64";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker";

const MAX_CHAR = 500;

export default function CreatePost() {
  const [postText, setPostText] = useState("");
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const [imgUrl, setImgUrl] = useState(null);

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
      // await handleImageChange(imageFile);
      const base64 = await imageToBase64(imageFile);
      // console.log(imgUrl, "Final aimge receievdalsd");
      const finalImg = "data:image/jpeg;base64," + base64;
      setImgUrl(finalImg);
      // console.log(finalImg, "REceived image from document picker");
    } catch (error) {
      console.log(error, "Eroor in document pciker");
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
            <Text>{imgUrl}</Text>
          </View>
          {imgUrl && (
            <View style={{ marginTop: 5, width: "100%", position: "relative" }}>
              <Image src={imgUrl} style={{ width: "100%", height: 200 }} />
            </View>
          )}
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
