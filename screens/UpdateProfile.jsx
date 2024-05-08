import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import * as DocumentPicker from "expo-document-picker";

import { imageToBase64 } from "../hooks/imageToBase64";
import axiosInstance from "../axiosInstance/axiosInstance";
import { userProfileUpdater } from "../store/userSlice";
import { ToastMessage } from "../components/Toast";
import { useNavigation } from "@react-navigation/native";

export default function UpdateProfile() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [updating, setUpdating] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const tempImg = user?.profilePic;

  const [inputs, setInputs] = useState({
    name: user?.name,
    username: user?.username,
    email: user?.email,
    bio: user?.bio,
    password: "",
  });

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

  const handleSubmit = async () => {
    setUpdating(true);
    try {
      const response = await axiosInstance.put(`/users/update/${user?._id}`, {
        ...inputs,
        profilePic: imgUrl,
      });
      // console.log(response, "Update profile response");
      dispatch(userProfileUpdater(response?.data));
      ToastMessage.showSuccessMessage("Profile Updated Successfully ");
      navigation.navigate("profile");
    } catch (error) {
      console.log(error);
      setUpdating(false);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            Update Profile
          </Text>
        </View>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={true}>
          <View>
            <TouchableOpacity
              onPress={UserDocumentPick}
              style={{ alignItems: "center" }}
            >
              {user?.profilePic ? (
                <Image
                  src={imgUrl || tempImg}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    objectFit: "fill",
                  }}
                />
              ) : (
                <Image
                  source={{
                    uri: `https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_640.png`,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    objectFit: "fill",
                  }}
                />
              )}

              <Text style={{ marginTop: 10, color: "white" }}>
                Change Avatar
              </Text>
            </TouchableOpacity>
            <View>
              <TextInput
                placeholder="Full name"
                placeholderTextColor={"white"}
                value={inputs.name}
                onChangeText={(text) => setInputs({ ...inputs, name: text })}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  padding: 10,
                  marginVertical: 10,
                  width: 300,
                  color: "white",
                }}
              />
              <TextInput
                placeholder="User name"
                placeholderTextColor={"white"}
                value={inputs.username}
                onChangeText={(text) =>
                  setInputs({ ...inputs, username: text })
                }
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  padding: 10,
                  marginVertical: 10,
                  color: "white",
                }}
              />
              <TextInput
                placeholder="Email address"
                placeholderTextColor={"white"}
                value={inputs.email}
                onChangeText={(text) => setInputs({ ...inputs, email: text })}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  padding: 10,
                  marginVertical: 10,
                  color: "white",
                }}
              />
              <TextInput
                placeholder="Bio"
                placeholderTextColor={"white"}
                value={inputs.bio}
                onChangeText={(text) => setInputs({ ...inputs, bio: text })}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  padding: 10,
                  marginVertical: 10,
                  color: "white",
                }}
              />
              <TextInput
                placeholder="Enter New Password"
                placeholderTextColor={"white"}
                value={inputs.password}
                onChangeText={(text) =>
                  setInputs({ ...inputs, password: text })
                }
                secureTextEntry
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  padding: 10,
                  marginVertical: 10,
                  color: "white",
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#0BDA51",
              padding: 10,
              borderRadius: 5,
              marginVertical: 10,
              alignItems: "center",

              width: 300,
              height: 50,
            }}
            onPress={handleSubmit}
            disabled={updating}
          >
            <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
              {updating ? "Updating..." : "Submit"}
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
