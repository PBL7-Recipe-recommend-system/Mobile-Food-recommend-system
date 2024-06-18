import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/color";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toCamelCase } from "../../utils/formatData";

export const AddFoodItem = ({ title }) => {
  const navigation = useNavigation();
  const handleAddFood = async () => {
    await AsyncStorage.setItem("isAddingMeal", "true");
    navigation.navigate("SearchFood", { meal: toCamelCase(title) });
  };
  return (
    <TouchableOpacity style={style.container} onPress={handleAddFood}>
      <View style={style.content}>
        <View style={style.addIcon}>
          <FontAwesome6 name="add" size={24} color={PRIMARY_COLOR} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
    justifyContent: "center",
  },
  addIcon: {
    width: 40,
    height: 40,
    backgroundColor: SECONDARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
