import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/color";

export const AddFoodItem = ({ title }) => {
  return (
    <TouchableOpacity style={style.container}>
      <View style={style.content}>
        <View style={style.addIcon}>
          <FontAwesome6 name="add" size={24} color={PRIMARY_COLOR} />
        </View>
        <Text className="text-center justify-center font-semibold">
          Add {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    marginHorizontal: "auto",
    height: 80,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 10,
    justifyContent: "center",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  addIcon: {
    width: 40,
    height: 40,
    marginRight: 5,
    backgroundColor: SECONDARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
