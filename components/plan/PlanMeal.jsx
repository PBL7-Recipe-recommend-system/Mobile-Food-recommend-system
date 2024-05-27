import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { DateList } from "./DateList";
import { MealList } from "./MealList";
import { PlanDescription } from "./PlanDescription";
import { NutritionBoard } from "./NutritionBoard";
import { getMealPlan } from "../../api/plan";
import { formatDate } from "../../utils/formatData";
import { getRecommendationFromStorage } from "../../utils/meals";
import { RECOMMEND_TAB } from "../../constants/plan";
import CustomButton from "../CustomButton";
import {
  getMealPlanFromStorage,
  setDateAddingToStorage,
} from "../../utils/asyncStorageUtils";

export const PlanMeal = ({ planType }) => {
  const [dataSource, setDataSource] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  useEffect(() => {
    const fetchData = async () => {
      let data;
      if (planType === RECOMMEND_TAB) {
        const response = await getRecommendationFromStorage();
        data = response.recommendations;
      } else {
        const response = await getMealPlan();
        data = response.data;
      }
      setDataSource(data);

      const dataForSelectedDate = data.find(
        (item) => item.date === selectedDate
      );
      await setDateAddingToStorage(selectedDate);
      setSelectedData(dataForSelectedDate);
    };
    fetchData();
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

  const handleSaveChange = async () => {
    const data = await getMealPlanFromStorage();
    console.log(data);
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
        <PlanDescription planType={planType} />
      </View>
      <View>
        <DateList value={selectedDate} setValue={setSelectedDate} />
      </View>
      <MealList dataSource={selectedData} planType={planType} />
      <NutritionBoard />
      <CustomButton
        title={"Save changes"}
        customStyle={style.button}
        onPressButton={handleSaveChange}
      />
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
