import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  GRAY_TEXT_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from "../../constants/color";

export const DateItem = ({ value, active, view, onPress }) => {
  const formatDate = view.split(" ")[0];
  const formatDay = view.split(" ")[1];
  const getContainerStyle = () => {
    return active ? [style.container, style.activeContainer] : style.container;
  };

  const getContentStyle = () => {
    return active ? [style.content, style.activeContent] : style.content;
  };
  return (
    <TouchableOpacity
      style={getContainerStyle()}
      onPress={() => {
        onPress(value);
      }}
    >
      <Text style={getContentStyle()}>{formatDate}</Text>
      <Text style={getContentStyle()}>{formatDay}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: 68,
    height: 68,
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 34,
    marginHorizontal: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    textAlign: "center",
    color: GRAY_TEXT_COLOR,
    fontWeight: "bold",
  },
  activeContainer: {
    backgroundColor: PRIMARY_COLOR,
  },
  activeContent: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});
