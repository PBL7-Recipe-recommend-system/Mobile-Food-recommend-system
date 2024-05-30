import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PRIMARY_COLOR } from "../../constants/color";
import {
  getMealPlanFromStorage,
  getUserFromStorage,
} from "../../utils/asyncStorageUtils";
import { RECOMMEND_TAB } from "../../constants/plan";
import { getGoal } from "../../utils/formatData";
import { getTodayMeals } from "../../utils/meals";
import { getMealPlan } from "../../api/plan";
export const PlanDescription = ({ planType }) => {
  const [dataForm, setDataForm] = useState({
    description: "",
    firstProp: "",
    secondProp: "",
    thirdProp: "",
  });
  const [dataTitle, setDataTitle] = useState({
    title: "",
    description: "",
    firstProp: "",
    secondProp: "",
    thirdProp: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      if (planType === RECOMMEND_TAB) {
        const user = await getUserFromStorage();
        setDataTitle({
          title: "Recommend plan",
          description: "Description",
          firstProp: "Meals per day",
          secondProp: "Recommend calories",
          thirdProp: "Goal",
        });
        setDataForm({
          description: `Thin and lean. Plan for a "skinny guy" who have a hard time gaining weight.`,
          firstProp: `${user.meals} meals`,
          secondProp: `${user.recommendCalories} kcal`,
          thirdProp: getGoal(user.dietaryGoal),
        });
      } else {
        const data = await getMealPlanFromStorage();
        setDataTitle({
          title: "My meal plan",
          description: "Description",
          firstProp: "Meals per day",
          secondProp: "Daily calories",
          thirdProp: "Total calories",
        });
        setDataForm({
          description: `${data[0].description}`,
          firstProp: `${data[0].mealCount} meals`,
          secondProp: `${data[0].dailyCalories} kcal`,
          thirdProp: `${data[0].totalCalories}`,
        });
      }
    };
    fetchData();
  }, []);
  return (
    <View style={style.mealDescription}>
      <View style={style.header}>
        <Text style={style.planName}>{dataTitle.title}</Text>
        <View style={style.editButton}>
          <Feather name="edit-3" size={24} color={PRIMARY_COLOR} />
        </View>
      </View>
      <View>
        <Text style={style.textDescription}>{dataTitle.description}</Text>
        <Text style={style.textContent}>{dataForm.description}</Text>
      </View>
      <View style={style.textContainer}>
        <Text style={style.textDescription}>{dataTitle.firstProp}</Text>
        <Text style={style.textContent}>{dataForm.firstProp}</Text>
      </View>
      <View style={style.textContainer}>
        <Text style={style.textDescription}>{dataTitle.secondProp}</Text>
        <Text style={style.textContent}>{dataForm.secondProp}</Text>
      </View>
      <View style={style.textContainer}>
        <Text style={style.textDescription}>{dataTitle.thirdProp}</Text>
        <Text style={style.textContent}>{dataForm.thirdProp}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mealDescription: {
    backgroundColor: "#fff",
    marginVertical: 20,
    padding: 20,
    color: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  editButton: {
    width: 40,
    height: 40,
    backgroundColor: "#E7F4F1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 4,
  },
  planName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textContainer: {
    marginVertical: 4,
  },
  textDescription: {
    color: "#8C8CA1",
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 10,
  },
  textContent: {
    fontSize: 16,
    fontWeight: "500",
  },
});
