import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PRIMARY_COLOR } from "../../constants/color";
export const PlanDescription = () => {
  return (
    <View style={style.mealDescription}>
      <View style={style.header}>
        <Text style={style.planName}>My Meal Plan</Text>
        <View style={style.editButton}>
          <Feather name="edit-3" size={24} color={PRIMARY_COLOR} />
        </View>
      </View>
      <View>
        <Text style={style.textDescription}>Description</Text>
        <Text style={style.textContent}>
          Thin and lean. Plan for a "skinny guy" who have a hard time gaining
          weight.
        </Text>
      </View>
      <View style={style.textContainer}>
        <Text style={style.textDescription}>Meals per day</Text>
        <Text style={style.textContent}>3 meals</Text>
      </View>
      <View style={style.textContainer}>
        <Text style={style.textDescription}>Daily calories</Text>
        <Text style={style.textContent}>3 meals</Text>
      </View>
      <View style={style.textContainer}>
        <Text style={style.textDescription}>Total meals</Text>
        <Text style={style.textContent}>3 meals</Text>
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
