import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { generateNumberOfMeals } from "../../utils/meals";
import { TrackingItem } from "./TrackingItem";
import { toCamelCase } from "../../utils/formatData";

export const TrackingList = ({ dataSource }) => {
  const [tracking, setTracking] = useState([]);
  const mealList = generateNumberOfMeals(5);
  useEffect(() => {
    const fetchData = async () => {
      let newTracking = [];
      mealList.map((item, index) => {
        const key = toCamelCase(item);
        if (dataSource[key]) {
          newTracking.push(dataSource[key]);
        } else {
          newTracking.push(null);
        }
      });
      setTracking(newTracking);
    };
    fetchData();
  }, []);

  const renderedMealList = useMemo(
    () =>
      mealList.map((meal, index) => {
        return (
          <TrackingItem
            key={index}
            title={meal}
            data={dataSource[toCamelCase(meal)]}
          />
        );
      }),
    [mealList, dataSource]
  );

  return <View>{renderedMealList}</View>;
};
