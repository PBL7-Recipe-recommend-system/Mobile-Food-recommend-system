import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../constants/color";
import { SelectionBar } from "./SelectionBar";
export const PlanForm = () => {
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
      <SelectionBar title={"Amount of meals"} />
      <View className="my-2">
        <Text className="text-[16px] font-bold">Calories per day</Text>
        <TextInput style={style.input} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mealDescription: {
    width: "100%",
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
    margin: "auto",
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
  textDescription: {
    color: "#ccc",
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 10,
  },
  textContent: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    marginVertical: 12,
    borderRadius: 8,
    width: "50%",
    height: 40,
    fontSize: 18,
    textAlign: "center",
  },
});
