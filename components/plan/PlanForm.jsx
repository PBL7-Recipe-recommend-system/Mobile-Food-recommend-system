import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../constants/color";
import { SelectionBar } from "./SelectionBar";
export const PlanForm = ({ value, setValue }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(
    'Thin and lean. Plan for a "skinny guy" who have a hard time gaining weight.'
  );

  return (
    <View style={style.mealDescription}>
      <View style={style.header}>
        <Text style={style.planName}>My Meal Plan</Text>
        <TouchableOpacity
          style={style.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Feather name="edit-3" size={24} color={PRIMARY_COLOR} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={style.textDescription}>Description</Text>
        {isEditing ? (
          <TextInput
            style={style.descriptionInput}
            onChangeText={(text) => {
              setValue({ ...value, description: text });
              setText(text);
            }}
            value={text}
            multiline
            numberOfLines={4}
          />
        ) : (
          <Text style={style.textContent}>{text}</Text>
        )}
      </View>
      <SelectionBar
        title={"Amount of meals"}
        value={value}
        setValue={setValue}
      />
      <View className="my-2">
        <Text className="text-[16px] font-bold">Calories per day</Text>
        <TextInput
          style={style.input}
          keyboardType="numeric"
          onChangeText={(text) => setValue({ ...value, dailyCalorie: text })}
        >
          <Text className="text-right " style={{ borderWidth: 1 }}></Text>
        </TextInput>
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
  descriptionInput: {
    fontSize: 16,
    fontWeight: "500",
    borderWidth: 2,
    borderColor: "#ccc",
    marginVertical: 12,
    borderRadius: 8,
    height: 100,
    paddingHorizontal: 10,
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
