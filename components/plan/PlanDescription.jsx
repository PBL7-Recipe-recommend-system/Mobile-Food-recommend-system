import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { PRIMARY_COLOR } from "../../constants/color";
import { CUSTOM_TAB, RECOMMEND_TAB } from "../../constants/plan";
import { getUserFromStorage } from "../../utils/asyncStorageUtils";
import { getGoal } from "../../utils/formatData";
import { updateMealPlan } from "../../api/plan";
export const PlanDescription = ({ planType, dataSource }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [customMealForm, setCustomMealForm] = useState({
    date: "",
    description: "",
    dailyCalories: `Thin and lean. Plan for a "skinny guy" who have a hard time gaining weight.`,
  });
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
      if (planType === CUSTOM_TAB) {
        setDataForm({
          description:
            dataSource && dataSource.description !== null
              ? dataSource.description
              : `Thin and lean. Plan for a "skinny guy" who have a hard time gaining weight.`,
          firstProp:
            dataSource && dataSource.mealCount !== null
              ? `${dataSource.mealCount} meals`
              : "0 meals",
          secondProp:
            dataSource && dataSource.dailyCalories !== null
              ? `${dataSource.dailyCalories} kcal`
              : "0 kcal",
          thirdProp:
            dataSource && dataSource.totalCalories !== null
              ? `${dataSource.totalCalories} kcal`
              : `0 kcal`,
        });
      }

      setCustomMealForm({
        date: dataSource?.date,
        description: dataSource?.description,
        dailyCalories: dataSource?.dailyCalories,
      });
    };
    fetchData();
  }, [dataSource]);

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
        setDataTitle({
          title: "My meal plan",
          description: "Description",
          firstProp: "Meals per day",
          secondProp: "Daily calories",
          thirdProp: "Total calories",
        });
      }
    };
    fetchData();
  }, []);

  const handleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async () => {
    await updateMealPlan([customMealForm]);
    setIsEditing(false);
  };
  return (
    <View style={style.mealDescription}>
      <View style={style.header}>
        <Text style={style.planName}>{dataTitle.title}</Text>
        {planType === CUSTOM_TAB && (
          <TouchableOpacity
            style={style.editButton}
            onPress={isEditing === true ? handleSubmit : handleEditing}
          >
            {isEditing === false ? (
              <Feather name="edit-3" size={24} color={PRIMARY_COLOR} />
            ) : (
              <Feather size={24} color={PRIMARY_COLOR} name="check" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {dataForm && (
        <>
          <View>
            <Text style={style.textDescription}>{dataTitle.description}</Text>
            {isEditing ? (
              <TextInput
                style={[
                  {
                    width: "100%",
                    borderWidth: 2,
                    borderColor: "#A9A9A9",
                    borderRadius: 10,
                    fontSize: 16,
                    padding: 10,
                    textAlignVertical: "top",
                  },
                ]}
                value={
                  customMealForm.description &&
                  customMealForm.description !== null
                    ? customMealForm.description
                    : ""
                }
                onChangeText={(text) => {
                  setCustomMealForm((prevState) => ({
                    ...prevState,
                    description: text,
                  }));
                }}
                multiline
                numberOfLines={4}
              ></TextInput>
            ) : (
              <Text style={style.textContent}>
                {planType === CUSTOM_TAB
                  ? customMealForm.description
                  : dataForm.description}
              </Text>
            )}
          </View>
          <View style={style.textContainer}>
            <Text style={style.textDescription}>{dataTitle.firstProp}</Text>
            <Text style={style.textContent}>{dataForm.firstProp}</Text>
          </View>
          <View style={style.textContainer}>
            <Text style={style.textDescription}>{dataTitle.secondProp}</Text>
            {isEditing ? (
              <TextInput
                style={style.textInput}
                textContentType="numeric"
                value={
                  customMealForm.dailyCalories
                    ? customMealForm.dailyCalories.toString()
                    : ""
                }
                onChangeText={(text) => {
                  setCustomMealForm((prevState) => ({
                    ...prevState,
                    dailyCalories: text,
                  }));
                }}
              ></TextInput>
            ) : (
              <Text style={style.textContent}>
                {planType === CUSTOM_TAB
                  ? `${
                      customMealForm.dailyCalories &&
                      customMealForm.dailyCalories !== null
                        ? customMealForm.dailyCalories
                        : "0"
                    } kcal`
                  : dataForm.secondProp}
              </Text>
            )}
          </View>
          <View style={style.textContainer}>
            <Text style={style.textDescription}>{dataTitle.thirdProp}</Text>
            <Text style={style.textContent}>{dataForm.thirdProp}</Text>
          </View>
        </>
      )}
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
  textInput: {
    borderWidth: 2,
    borderColor: "#A9A9A9",
    borderRadius: 10,
    fontSize: 16,
    padding: 4,
    paddingHorizontal: 10,
    width: "40%",
  },
});
