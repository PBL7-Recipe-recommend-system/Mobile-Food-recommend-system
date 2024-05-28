import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export const SavedButton = () => {
  return (
    <TouchableOpacity style={style.container}>
      <Feather name="bookmark" size={24} color="black" />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginHorizontal: 10,
  },
});
