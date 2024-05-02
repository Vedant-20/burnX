import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

export default function UpdateProfile() {
  const [updating, setUpdating] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    password: "",
  });

  const handleSubmit = async () => {};
  return (
    <Layout>
      <View style={styles.container}>
        <View>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            Update Profile
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => {}} style={{ alignItems: "center" }}>
            <Image
              source={{
                uri: `https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_640.png`,
              }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text style={{ marginTop: 10, color: "white" }}>Change Avatar</Text>
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
              onChangeText={(text) => setInputs({ ...inputs, username: text })}
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
              placeholder="Password"
              placeholderTextColor={"white"}
              value={inputs.password}
              onChangeText={(text) => setInputs({ ...inputs, password: text })}
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
            backgroundColor: "#90EE90",
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
