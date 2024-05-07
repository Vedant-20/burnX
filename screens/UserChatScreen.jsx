import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Conversation from "../components/Conversation";
import { useSocket } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";

import axiosInstance from "../axiosInstance/axiosInstance";
import { ToastMessage } from "../components/Toast";
import {
  conversationsUpdater,
  newConversationUpdater,
  selectedConversationUpdater,
} from "../store/messagesSlice";

export default function UserChatScreen() {
  const currentUser = useSelector((state) => state.user.user);
  // const [searchedUser, setSearchedUser] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const dispatch = useDispatch();
  const { socket, onlineUsers } = useSocket();

  useEffect(() => {
    socket?.on("messagesSeen", ({ conversationId }) => {
      setConversations((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if (conversation._id === conversationId) {
            return {
              ...conversation,
              lastMessage: {
                ...conversation?.lastMessage,
                seen: true,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
    });
  }, [socket, setConversations]);

  useEffect(() => {
    const getConversations = async () => {
      setLoadingConversations(true);
      try {
        const res = await axiosInstance.get(`/messages/conversations`);

        setConversations(res?.data);
      } catch (error) {
        ToastMessage.showErrorMessage(error.message);
      } finally {
        setLoadingConversations(false);
      }
    };

    getConversations();
  }, [setConversations]);

  const handleOnchangeSearch = async (e) => {
    setSearchText(e);
    // console.log(e);
    try {
      const res = await axiosInstance.post(`/users/search/${e}`);
      console.log(res, "Search user");
      // setSearchedUser(res?.data)
      const searchedUser = await res?.data[0];

      const conversationAlreadyExists = conversations.find(
        (conversation) =>
          conversation?.participants[0]?._id === searchedUser?._id
      );

      if (conversationAlreadyExists) {
        setSelectedConversation({
          _id: conversationAlreadyExists?._id,
          userId: searchedUser?._id,
          username: searchedUser?.username,
          userProfilePic: searchedUser?.profilePic,
        });
        dispatch(
          selectedConversationUpdater({
            _id: conversationAlreadyExists?._id,
            userId: searchedUser?._id,
            username: searchedUser?.username,
            userProfilePic: searchedUser?.profilePic,
          })
        );
        return;
      }

      const mockConversation = {
        mock: true,
        lastMessage: {
          text: "",
          sender: "",
        },
        _id: Date.now(),
        participants: [
          {
            _id: searchedUser._id,
            username: searchedUser.username,
            profilePic: searchedUser.profilePic,
          },
        ],
      };
      setConversations((prevConvs) => [...prevConvs, mockConversation]);
      dispatch(conversationsUpdater(conversations));
      dispatch(
        selectedConversationUpdater({
          _id: Date.now(),
          userId: searchedUser?._id,
          username: searchedUser?.username,
          userProfilePic: searchedUser?.profilePic,
        })
      );
      // dispatch(newConversationUpdater(conversations));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout>
        <ScrollView
          style={{
            height: "100%",
            marginBottom: 20,
            backgroundColor: "#101010",
          }}
        >
          <View style={{ display: "flex", gap: 4 }}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                margin: "auto",
                marginTop: 10,
              }}
            >
              <Text style={{ color: "#ccc", fontWeight: "bold", fontSize: 20 }}>
                Your Conversations
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 4,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 10,
                  width: "80%",
                }}
              >
                <TextInput
                  placeholder="Search for a user"
                  style={{ marginLeft: 10, color: "white" }}
                  placeholderTextColor={"#ccc"}
                  onChangeText={(e) => handleOnchangeSearch(e)}
                />
                <TouchableOpacity
                  style={{ marginRight: 20 }}
                  onPress={() => {}}
                >
                  <FontAwesome name="search" size={24} color={"#ccc"} />
                </TouchableOpacity>
              </View>

              {loadingConversations && (
                <ActivityIndicator size="large" color={"lime"} />
              )}

              {!loadingConversations &&
                conversations.map((conversation) => (
                  <Conversation
                    key={conversation?._id}
                    isOnline={onlineUsers?.includes(
                      conversation?.participants[0]?._id
                    )}
                    conversation={conversation}
                  />
                ))}
            </View>
          </View>
        </ScrollView>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({});
