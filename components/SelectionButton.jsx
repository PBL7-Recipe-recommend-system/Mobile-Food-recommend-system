import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const SelectionButton = ({ title, isSelected, onPressButton }) => {
  return (
    <View>
      <TouchableOpacity
        style={isSelected ? style.activeContainer : style.container}
        onPress={() => onPressButton(title)}
      >
        <Text style={isSelected ? style.activeContent : style.content}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#F1F5F5",
    borderRadius: 24,
    marginRight: 12,
  },

  activeContainer: {
    backgroundColor: "#129575",
    borderRadius: 24,
    marginRight: 12,
  },

  content: {
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  activeContent: {
    color: "#FFFFFF",
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
