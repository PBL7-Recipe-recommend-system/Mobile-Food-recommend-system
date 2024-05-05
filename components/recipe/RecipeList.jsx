import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { RecipeItem } from "./RecipeItem";

export const RecipeList = ({ title }) => {
  return (
    <View style={{ height: "36%" }}>
      <View style={style.categoryContainer}>
        <Text className="text-xl font-bold">{title}</Text>
        <TouchableOpacity>
          <Text style={style.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  seeAllText: {
    fontSize: 14,
    color: "#129575",
    fontWeight: "900",
  },
});
