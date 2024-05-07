import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import * as DocumentPicker from "expo-document-picker";
import { imageToBase64 } from "../hooks/imageToBase64";
import axiosInstance from "../axiosInstance/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { conversationsUpdater } from "../store/messagesSlice";

export default function MessageInput({ setMessages }) {
  const selectedConversation = useSelector(
    (state) => state.messages.selectedConversation
  );
  const dispatch = useDispatch();

  const [conversations, setConversations] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);

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

  const handleSendMessage = async () => {
    if (!messageText && !imgUrl) return;
    if (isSending) return;

    setIsSending(true);

    try {
      const res = await axiosInstance.post(`/messages/`, {
        message: messageText,
        recipientId: selectedConversation?.userId,
        img: imgUrl,
      });
      // console.log(res, "mesaage input respones");
      setMessages((messages) => [...messages, res?.data]);

      setConversations((prevConvs) => {
        const updatedConversations = prevConvs.map((conversation) => {
          if (conversation?._id === selectedConversation?._id) {
            return {
              ...conversation,
              lastMessage: {
                text: messageText,
                sender: res?.data?.sender,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });

      await dispatch(conversationsUpdater(conversations));

      setMessageText("");
      setImgUrl("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };
  return (
    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
      <TextInput
        style={{ flex: 1, color: "white" }}
        placeholder="Type a message"
        placeholderTextColor={"#ccc"}
        onChangeText={(text) => setMessageText(text)}
        value={messageText}
      />
      <TouchableOpacity style={{ marginRight: 10 }} onPress={handleSendMessage}>
        <FontAwesome name="send" color={"#ccc"} size={16} />
      </TouchableOpacity>
      <TouchableOpacity onPress={UserDocumentPick}>
        <FontAwesome6 name="image" color={"#ccc"} size={16} />
      </TouchableOpacity>
      {imgUrl && (
        <View>
          <Image source={{ uri: imgUrl }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginVertical: 10,
            }}
          >
            {!isSending ? (
              <TouchableOpacity onPress={handleSendMessage}>
                <FontAwesome name="send" color={"#ccc"} size={16} />
              </TouchableOpacity>
            ) : (
              <ActivityIndicator size={"small"} color={"lime"} />
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
