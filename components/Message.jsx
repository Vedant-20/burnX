import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

export default function Message({ ownMessage, message }) {
  const user = useSelector((state) => state.user.user);
  const selectedConversation = useSelector(
    (state) => state.messages.selectedConversation
  );
  // console.log(selectedConversation, "selecetdajksdnjsnadjkjsn");
  // const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <>
      {ownMessage ? (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "flex-end",
            gap: 2,
          }}
        >
          {message?.text && (
            <View
              style={{
                backgroundColor: "#34D399",
                maxWidth: 350,
                width: 150,
                padding: 1,
                borderRadius: 4,
                marginTop: 2,
              }}
            >
              <Text style={{ color: "white" }}>{message?.text}</Text>
              <View style={{ alignSelf: "flex-end", marginLeft: 3 }}>
                <FontAwesome6
                  name="check-double"
                  size={16}
                  color={message?.seen ? "#2590EB" : "#d3d3d3"}
                />
              </View>
            </View>
          )}
          {/* {message?.img && (
            <View style={{ marginTop: 5, width: 200 }}>
              <ActivityIndicator size={"small"} color={"lime"} />
            </View>
          )} */}

          {message?.img && (
            <View style={{ marginTop: 5, width: 200 }}>
              <Image
                source={{ uri: message?.img }}
                alt="Message Image"
                style={{ borderRadius: 4, height: 100, width: 100 }}
              />
              <FontAwesome6
                name="check-double"
                size={16}
                color={message?.seen ? "#2590EB" : "#d3d3d3"}
              />
            </View>
          )}

          <Image
            source={{ uri: user?.profilePic }}
            style={{ width: 10, height: 10, borderRadius: 100 }}
          />
        </View>
      ) : (
        <View style={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Image source={{ uri: selectedConversation?.userProfilePic }} />
          {message?.text && (
            <Text
              style={{
                color: "black",
                backgroundColor: "#d3d3d3",
                padding: 3,
                borderRadius: 4,
                maxWidth: "350px",
              }}
            >
              {message?.text}
            </Text>
          )}

          {/* {message?.img && (
            <View style={{ marginTop: 5, width: 200 }}>
              <ActivityIndicator size={"small"} color={"lime"} />
            </View>
          )} */}
          {message?.img && (
            <View style={{ marginTop: 5, width: 200 }}>
              <Image
                source={{ uri: message?.img }}
                alt="Message Image"
                style={{ borderRadius: 4, height: 100, width: 100 }}
              />
              <FontAwesome6
                name="check-double"
                size={16}
                color={message?.seen ? "#2590EB" : "#d3d3d3"}
              />
            </View>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
