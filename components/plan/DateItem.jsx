import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  GRAY_TEXT_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from "../../constants/color";

export const DateItem = ({ value, active }) => {
  const formatDate = value.split(" ")[0];
  const formatDay = value.split(" ")[1];
  const getContainerStyle = () => {
    return active ? [style.container, style.activeContainer] : style.container;
  };

  const getContentStyle = () => {
    return active ? [style.content, style.activeContent] : style.content;
  };
  return (
    <View style={getContainerStyle()}>
      <Text style={getContentStyle()}>
        {formatDate} {"\n"} {formatDay}
      </Text>
    </View>
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
    alignItems: "center",
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
