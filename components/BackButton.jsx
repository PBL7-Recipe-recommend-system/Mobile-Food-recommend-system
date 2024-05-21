import React from "react";
import { TouchableOpacity, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../constants/color";
import { useNavigation } from "@react-navigation/native";

export const BackButton = ({ onPress, color }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: 60,
        height: 40,
        justifyContent: "center",
      }}
      onPress={handlePress}
    >
      <FontAwesome6
        name="arrow-left"
        size={24}
        color={color ? color : PRIMARY_COLOR}
      />
    </TouchableOpacity>
  );
};
