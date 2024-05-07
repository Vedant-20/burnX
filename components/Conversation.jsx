import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  newConversationUpdater,
  selectedConversationUpdater,
} from "../store/messagesSlice";

export default function Conversation({ conversation, isOnline }) {
  const user = conversation.participants[0];
  const currentUser = useSelector((state) => state.user.user);
  const selConvo = useSelector((state) => state.messages.selectedConversation);
  const lastMessage = conversation.lastMessage;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedConversation, setSelectedConversation] = useState(selConvo);

  // console.log(user, "chekcing convob data");
  // console.log(conversation, "chekcing convob data 2");
  // console.log(selConvo, "selconvo");

  const navigateToMessageScreen = async () => {
    dispatch(newConversationUpdater(user));
    dispatch(
      selectedConversationUpdater({
        _id: conversation?._id,
        userId: user?._id,
        username: user?.username,
        userProfilePic: user?.profilePic,
        mock: conversation?.mock,
      })
    );
    navigation.navigate("messagescreen", {
      profilePic: user?.profilePic,
      username: user?.username,
      userId: user?._id,
    });
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        borderRadius: 4,
        marginTop: 10,
        width: "90%",
        backgroundColor:
          selectedConversation?._id === conversation?._id
            ? "#D3D3D3"
            : "#818589",
      }}
      onPress={navigateToMessageScreen}
    >
      <View>
        <Image
          source={{ uri: user?.profilePic }}
          style={{ width: 70, height: 70, borderRadius: 100, marginRight: 20 }}
        >
          {isOnline && (
            <View
              style={{ width: 5, height: 5, backgroundColor: "lime" }}
            ></View>
          )}
        </Image>
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{
            flexDirection: "row",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          {user?.username}{" "}
          <Image
            source={{
              uri: `https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png`,
            }}
            style={{ width: 25, height: 25, marginLeft: 4 }}
          />
        </Text>
        <Text style={{ flexDirection: "row", alignItems: "center" }}>
          {currentUser?._id === lastMessage?.sender && lastMessage?.seen && (
            <FontAwesome6 name="check-double" size={16} />
          )}
          {lastMessage?.text?.length > 18
            ? lastMessage?.text.substring(0, 18) + "..."
            : lastMessage?.text || (
                <FontAwesome6 name="image" color={"#ccc"} size={16} />
              )}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
