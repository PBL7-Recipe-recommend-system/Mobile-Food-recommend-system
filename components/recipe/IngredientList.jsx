import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export const IngredientList = ({ dataSource }) => {
  return (
    <ScrollView className="my-2" contentContainerStyle={style.ingredientsList}>
      {dataSource.map((item, index) => (
        <View style={style.ingredientItem} key={index}>
          <Text className="text-[16px]">{item}</Text>
          <Text className="text-[14px] text-[#B5B5B5]">250g</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  ingredientsList: {
    flexGrow: 1,
  },
  ingredientItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
});
