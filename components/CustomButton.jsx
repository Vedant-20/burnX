import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function CustomButton({
  label,
  isLoading = false,
  onPress,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#ccc" : "#AD40AF",
        padding: 15,
        borderRadius: 10,
        marginBottom: 30,
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
