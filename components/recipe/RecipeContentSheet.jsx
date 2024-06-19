import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IngredientList } from "./IngredientList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PRIMARY_COLOR } from "../../constants/color";
import {
  getDateAddingFromStorage,
  getMealAddingFromStorage,
  getMealPlanFromStorage,
} from "../../utils/asyncStorageUtils";
import { getMealPlan, updateMealPlan } from "../../api/plan";
import { useNavigation } from "@react-navigation/native";
import { Loading } from "../Loading";
export const RecipeContentSheet = ({ data, handleSetServing, baseServing }) => {
  const [serving, setServing] = useState(baseServing);
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [mealAdding, setMealAdding] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setServing(baseServing);
  }, [baseServing]);

  useEffect(() => {
    const getIsAddingMeal = async () => {
      const addingMeal = await AsyncStorage.getItem("isAddingMeal");
      const mealAddingValue = await getMealAddingFromStorage();
      setMealAdding(mealAddingValue);
      setIsAddingMeal(addingMeal);
    };
    getIsAddingMeal();
  }, []);

  const ingredientsList = data?.recipeIngredientsParts || [];
  const quantitiesList = data?.recipeIngredientsQuantities || [];

  const formatTime = (timeStr) => {
    const hours = timeStr.match(/\d+H/)?.[0]?.slice(0, -1);
    const minutes = timeStr.match(/\d+M/)?.[0]?.slice(0, -1);
    return `${hours ? hours + " hours " : ""}${
      minutes ? minutes + " mins" : ""
    }`.trim();
  };

  const handleAdjustServing = (type) => {
    if (type === "increment") {
      handleSetServing(serving + 1);
      setServing(serving + 1);
    } else {
      if (serving === 1) return;
      handleSetServing(serving - 1);
      setServing(serving - 1);
    }
  };

  const handleAddFood = async () => {
    setLoading(true);
    try {
      const mealPLan = await getMealPlanFromStorage();
      const date = await getDateAddingFromStorage();
      const param = {
        meal: mealAdding,
        date: date,
        recipeId: data.recipeId,
      };
      await updateMealPlan(param);
      await getMealPlan();

      navigation.navigate("PlanStack");
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={style.container}>
      <View style={style.contentHeader}>
        <TouchableOpacity
          style={{ width: "10%" }}
          onPress={() => setServing(data.recipeServings)}
        >
          <AntDesign
            name="reload1"
            size={24}
            color="black"
            style={style.reloadButton}
          />
        </TouchableOpacity>
        <View
          className="flex flex-col justify-center items-center"
          style={{ width: "80%" }}
        >
          <Text className="text-center" style={style.title}>
            {data?.name}
          </Text>
          <Text className="text-center" style={style.category}>
            Lunch / {formatTime(data?.totalTime)}
          </Text>
        </View>
        <View style={{ width: "10%" }}>
          {isAddingMeal === "true" && (
            <TouchableOpacity
              onPress={handleAddFood}
              style={{
                backgroundColor: PRIMARY_COLOR,
                borderRadius: 6,
                paddingHorizontal: "8%",
                paddingVertical: "18%",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 18,
                  lineHeight: 18,
                  fontWeight: "bold",
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={style.nutritionContainer}>
        <View style={style.nutritionItemContainer}>
          <Text>
            {((data.calories / data.recipeServings) * serving).toFixed(1)} kcal
          </Text>
          <Text style={style.nutritionTitle}>Calories</Text>
        </View>
        <View style={style.nutritionItemContainer}>
          <Text>
            {((data.proteinContent / data.recipeServings) * serving).toFixed(1)}{" "}
            g
          </Text>
          <Text style={style.nutritionTitle}>Protein</Text>
        </View>
        <View style={style.nutritionItemContainer}>
          <Text>
            {(
              (data.carbonhydrateContent / data.recipeServings) *
              serving
            ).toFixed(1)}{" "}
            g
          </Text>
          <Text style={style.nutritionTitle}>Carbs</Text>
        </View>
        <View style={style.nutritionItemContainer}>
          <Text>
            {((data.fatContent / data.recipeServings) * serving).toFixed(1)} g
          </Text>
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
          <IngredientList
            dataSource={ingredientsList}
            quantities={quantitiesList}
            baseServing={data.recipeServings}
            serving={serving}
          />
        </View>
      </View>
      <Loading loading={loading} />
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  reloadButton: {},

  title: {
    fontSize: 16,
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
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
