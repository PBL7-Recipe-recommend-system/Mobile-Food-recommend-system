import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../constants/color";

export const SavedButton = ({ active, setIsSaved }) => {
  return (
    <TouchableOpacity
      style={active === true ? style.activeContainer : style.container}
      onPress={setIsSaved}
    >
      <Feather
        name="bookmark"
        size={22}
        color={active === true ? "white" : "black"}
      />
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
  activeContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginHorizontal: 10,
    backgroundColor: PRIMARY_COLOR,
  },
});
