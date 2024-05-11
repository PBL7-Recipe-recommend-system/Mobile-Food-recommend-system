import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PRIMARY_COLOR } from "../../constants/color";

export const FilterButton = ({ textLine1, textLine2, onPress }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text
        style={[styles.buttonText, Platform.OS !== "ios" && { fontSize: 10 }]}
        className="text-xs"
      >
        {textLine1} <Text style={styles.highlightText}>{textLine2}</Text>
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    marginRight: 16,
  },
  buttonText: {
    color: PRIMARY_COLOR, // Text color for the main text
    textAlign: "center",
  },
  highlightText: {
    color: "#129575", // Highlighted text color for "program"
    fontSize: 14,
    fontWeight: "bold",
  },
});
