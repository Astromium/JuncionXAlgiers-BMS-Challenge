import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import  colors  from "../config/colors";

export default function AppInput({
  placeholder,
  icon,
  onChange,
  value,
  placeholderTextColor,
  ...otherProps
}) {
  return (
    <View style={[styles.inputContainer, otherProps.inputContainerStyle]}>
      {icon && (
        <MaterialCommunityIcons
          style={{ marginRight: 10 }}
          name={icon}
          size={25}
          color={colors.primary}
        />
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChange}
        style={[styles.input, otherProps.inputStyle]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    color: 'rgba(0,0,0,0.8)',
    fontFamily: "Baloo2-regular",
    fontSize: 16,
    paddingVertical: 5,
  },
});
