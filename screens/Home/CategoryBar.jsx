import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { CategoryList } from "../../components/category/CategoryList";
import { PRIMARY_COLOR } from "../../constants/color";

export const CategoryBar = () => {
  return (
    <View>
      <View style={style.categoryContainer} className="w-full">
        <Text className="text-xl font-black">Category</Text>
        <TouchableOpacity>
          <Text style={style.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View className="h-16 items-center ">
        <CategoryList />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  seeAllText: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    fontWeight: "900",
  },
});
