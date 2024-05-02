import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

export default function InputField({
  label,
  icon,
  inputType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
  onBlur,
  value,
  error,
  touched,
}) {
  return (
    <View
      style={{
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          paddingBottom: 8,
          marginBottom: 10,
        }}
      >
        {icon}

        <TextInput
          style={{ flex: 1, paddingVertical: 0, color: "#fff" }}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          placeholder={label}
          placeholderTextColor={"white"}
          keyboardType={inputType === "password" ? "default" : inputType}
          secureTextEntry={inputType === "password"}
        />

        {fieldButtonLabel && (
          <Text style={styles.fieldButton} onPress={fieldButtonFunction}>
            {fieldButtonLabel}
          </Text>
        )}
      </View>
      {error && touched && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = {
  error: {
    color: "red",
    fontSize: 12,
  },
  fieldButton: {
    position: "absolute",
    right: 0,
    alignSelf: "center",
    color: "#AD40AF",
    fontSize: 12,
  },
};
