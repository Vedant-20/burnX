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

export default function Actions() {
  const [liked, setLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [reply, setReply] = useState("");
  const handleReply = async () => {
    console.log("reply", reply);
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
        <TouchableOpacity onPress={() => {}}>
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
        <Text style={{ fontSize: 12, color: "#999", marginRight: 5 }}>
          6 replies
        </Text>
        <View
          style={{
            width: 1,
            height: 15,
            backgroundColor: "#ccc",
            marginHorizontal: 5,
          }}
        />
        <Text style={{ fontSize: 12, color: "#999", marginRight: 5 }}>
          5 likes
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
