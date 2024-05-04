import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("home")}
      >
        <FontAwesome
          style={[styles.icon, route.name === "home" && styles.active]}
          name="home"
          color={"white"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("people")}
      >
        <FontAwesome
          style={[styles.icon, route.name === "people" && styles.active]}
          name="users"
          color={"white"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("createpost")}
      >
        <FontAwesome
          style={[styles.icon, route.name === "createpost" && styles.active]}
          name="plus-square"
          color={"white"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("profile")}
      >
        <FontAwesome
          style={[styles.icon, route.name === "profile" && styles.active]}
          name="user-circle"
          color={"white"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 25,
  },
  active: {
    color: "lime",
  },
});
