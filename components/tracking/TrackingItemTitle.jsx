import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const TrackingItemTitle = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("DetailedRecipe", { id: data.recipeId })
        }
      >
        <Text style={style.nameMeals} numberOfLines={1} ellipsizeMode="tail">
          {data?.name}
        </Text>
      </TouchableOpacity>
      <Text className="my-2">{data?.servings} servings</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "space-between",
  },
  nameMeals: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
