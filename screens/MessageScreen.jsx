import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSelector } from "react-redux";
import { useSocket } from "../context/SocketContext";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import axiosInstance from "../axiosInstance/axiosInstance";

export default function MessageScreen({ route }) {
  // const { profilePic, username, userId } = route.params;
  const selectedConversation = useSelector(
    (state) => state.messages.selectedConversation
  );

  // console.log(selectedConversation, "mesaage scrren other user data check");

  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const currentUser = useSelector((state) => state.user.user);
  const { socket } = useSocket();
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("newMessage");
  }, [socket]);

  // useEffect(() => {
  //   messageEndRef.current?.scrollToEnd({ animated: true });
  // }, [messages]);

  useEffect(() => {
    setLoadingMessages(true);
    setMessages([]);
    const getMessages = async () => {
      try {
        const res = await axiosInstance(
          `messages/${selectedConversation?.userId}`
        );

        setMessages(res?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMessages(false);
      }
    };
    getMessages();
  }, [selectedConversation?.userId]);

  return (
    <Layout>
      <View
        style={{
          display: "flex",
          // alignItems: "center",
          height: "100%",
          backgroundColor: "#101010",
        }}
      >
        <View
          style={{
            width: "100%",
            gap: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: selectedConversation?.userProfilePic }}
            style={{
              height: 40,
              width: 40,
              marginTop: 20,
              marginLeft: 20,
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              color: "#ccc",
              fontSize: 24,
              fontWeight: "bold",
              marginRight: 50,
              marginTop: 10,
            }}
          >
            {selectedConversation?.username}
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              marginVertical: 4,
              width: "100%",
              height: 1,
              backgroundColor: "#ccc",
            }}
          />

          <ScrollView>
            {loadingMessages ? (
              <ActivityIndicator size={"large"} color={"lime"} />
            ) : (
              <>
                {messages?.map((message) => (
                  <Message
                    key={message?._id}
                    message={message}
                    ownMessage={currentUser?._id === message?.sender}
                  />
                ))}
              </>
            )}
            <View ref={messageEndRef} />
          </ScrollView>
          <MessageInput setMessages={setMessages} />
        </ScrollView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({});
