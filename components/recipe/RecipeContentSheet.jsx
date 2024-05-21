import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IngredientList } from "./IngredientList";
export const RecipeContentSheet = ({ data }) => {
  const [serving, setServing] = useState(2);

  const ingredientsList = data?.recipeIngredientsParts || [];

  const formatTime = (timeStr) => {
    const hours = timeStr.match(/\d+H/)?.[0]?.slice(0, -1);
    const minutes = timeStr.match(/\d+M/)?.[0]?.slice(0, -1);
    return `${hours ? hours + " hours " : ""}${
      minutes ? minutes + " mins" : ""
    }`.trim();
  };

  const handleAdjustServing = (type) => {
    if (type === "increment") {
      setServing(serving + 1);
    } else {
      if (serving === 1) return;
      setServing(serving - 1);
    }
  };
  return (
    <View style={style.container}>
      <View style={style.contentHeader}>
        <View>
          <AntDesign
            name="reload1"
            size={24}
            color="black"
            style={style.reloadButton}
          />
        </View>
        <View className="flex flex-col justify-center items-center">
          <Text className="text-center" style={style.title}>
            {data?.name}
          </Text>
          <Text className="text-center" style={style.category}>
            Lunch / {formatTime(data?.totalTime)}
          </Text>
        </View>
      </View>
      <View style={style.nutritionContainer}>
        <View style={style.nutritionItemContainer}>
          <Text>{data.calories} g</Text>
          <Text style={style.nutritionTitle}>Calories</Text>
        </View>
        <View style={style.nutritionItemContainer}>
          <Text>{data.proteinContent} g</Text>
          <Text style={style.nutritionTitle}>Protein</Text>
        </View>
        <View style={style.nutritionItemContainer}>
          <Text>{data.carbonhydrateContent} g</Text>
          <Text style={style.nutritionTitle}>Carbs</Text>
        </View>
        <View style={style.nutritionItemContainer}>
          <Text>{data.fatContent} g</Text>
          <Text style={style.nutritionTitle}>Fat</Text>
        </View>
      </View>
      <View style={style.ingredientsList}>
        <View className="flex-row justify-between">
          <View className="flex-row items-center justify-between">
            <Text className="font-bold text-sm mr-4">Ingredients</Text>
            <Text className="text-[#A6A6A6]">{serving} serves</Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity
              style={style.modifyButton}
              onPress={() => handleAdjustServing("decrement")}
            >
              <Text>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.modifyButton}
              onPress={() => handleAdjustServing("increment")}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: "86%" }}>
          <IngredientList dataSource={ingredientsList} />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
  },

  contentHeader: {
    marginHorizontal: 16,
    position: "relative",
    marginBottom: 24,
  },

  reloadButton: {
    position: "absolute",
    top: 0,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#676767",
  },

  nutritionContainer: {
    backgroundColor: "#F4F4F4",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: "10%",
    paddingVertical: 16,
  },
  nutritionTitle: {
    fontWeight: "bold",
  },

  nutritionItemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  ingredientsList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 18,
    height: "70%",
  },

  modifyButton: {
    width: 34,
    height: 22,
    borderWidth: 1,
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 4,
    borderRadius: 4,
  },

  ingredientItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
});
