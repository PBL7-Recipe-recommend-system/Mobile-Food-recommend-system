import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { RECOMMEND_TAB } from "../../constants/plan";
import {
  getDateAddingFromStorage,
  getMealPlanFromStorage,
  setDateAddingToStorage,
} from "../../utils/asyncStorageUtils";
import { formatDate } from "../../utils/formatData";
import { getRecommendationFromStorage } from "../../utils/meals";
import { DateList } from "./DateList";
import { MealList } from "./MealList";
import { NutritionBoard } from "./NutritionBoard";
import { PlanDescription } from "./PlanDescription";
import { getMealPlan } from "./../../api/plan";

export const PlanMeal = ({ planType }) => {
  const [dataSource, setDataSource] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const dateAdding = await getDateAddingFromStorage();
        let data;
        if (planType === RECOMMEND_TAB) {
          const response = await getRecommendationFromStorage();
          data = response.recommendations;
        } else {
          const response = await getMealPlanFromStorage();
          data = response;
        }
        setDataSource(data);

        const dataForSelectedDate = data.find(
          (item) => item.date === dateAdding
        );
        setSelectedData(dataForSelectedDate);
      };
      fetchData();
    }, [])
  );

  useEffect(() => {
    const handleChangeTab = async () => {
      const date = formatDate(new Date());
      await setDateAddingToStorage(date);
      setSelectedDate(date);
      let data;
      if (planType === RECOMMEND_TAB) {
        const response = await getRecommendationFromStorage();
        data = response.recommendations;
      } else {
        const response = await getMealPlanFromStorage();
        data = response;
      }
      setDataSource(data);

      const dataForSelectedDate = data.find((item) => item.date === date);
      setSelectedData(dataForSelectedDate);
    };
    handleChangeTab();
  }, [planType]);

  useEffect(() => {
    const fetchDate = async () => {
      const dateAdding = await getDateAddingFromStorage();
      setSelectedDate(dateAdding);
    };
    fetchDate();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (dataSource && dataSource.length > 0) {
        let dataForSelectedDate = dataSource.find(
          (item) => item.date === selectedDate
        );
        dataForSelectedDate = dataForSelectedDate ? dataForSelectedDate : null;
        setSelectedData(dataForSelectedDate);
      }
    };
    fetchData();
  }, [selectedDate]);

  const handleRemoveMeals = async (date) => {
    await getMealPlan();
    const response = await getMealPlanFromStorage();
    setDataSource(response);
    const dataForSelectedDate = response.find((item) => item.date === date);
    console.log("Data for selected date", dataForSelectedDate);
    setSelectedData(dataForSelectedDate);
  };

  return (
    <Animated.ScrollView
      contentContainerStyle={style.container}
      scrollEventThrottle={16}
    >
      <View
        style={{
          paddingHorizontal: 30,
        }}
      >
        <PlanDescription dataSource={selectedData} planType={planType} />
      </View>
      <View>
        <DateList value={selectedDate} setValue={setSelectedDate} />
      </View>
      <MealList
        dataSource={selectedData}
        planType={planType}
        setSelectedMeals={setSelectedMeals}
        handleRemoveMeal={handleRemoveMeals}
      />
      <NutritionBoard data={selectedData} />
    </Animated.ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom: 20,
  },
  button: {
    marginHorizontal: "auto",
    width: "70%",
  },
  customButton: {
    paddingVertical: 18,
  },
  button: {
    marginHorizontal: "auto",
    paddingHorizontal: "10%",
    paddingVertical: "4%",
  },
});
