import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

export const BackButton = ({ navigation, onPress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <FontAwesome6 name="arrow-left" size={24} color="#129575" />
    </TouchableOpacity>
  );
};
