import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <View style={styles.logoConatiner}>
          <View>
            <Text style={styles.logo}>🔥</Text>
          </View>
          <View>
            <Text style={styles.logoText}>burnX</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.chatLogoContainer}>
          <FontAwesome size={30} color={"#90EE90"} name="wechat" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
    height: 60,
    // marginTop: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#101010",
  },
  logoConatiner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  logo: {
    fontSize: 26,
  },
  logoText: {
    fontSize: 16,
    color: "lime",
  },
  chatLogoContainer: {
    marginRight: 10,
  },
});
