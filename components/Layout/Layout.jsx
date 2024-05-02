import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <StatusBar />
      {/* <SafeAreaView> */}
      <Header />
      <View>{children}</View>
      <View style={styles.footer}>
        <Footer />
      </View>
      {/* </SafeAreaView> */}
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    display: "flex",
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    zIndex: 100,
    borderTopWidth: 1,
    position: "absolute",
    bottom: 0,
    padding: 10,
    borderColor: "white",
    backgroundColor: "#101010",
  },
});
