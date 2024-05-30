import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { generateDays } from "../../utils/meals";
import { DateItem } from "./DateItem";
import {
  getDateAddingFromStorage,
  getMealAddingFromStorage,
  setDateAddingToStorage,
} from "../../utils/asyncStorageUtils";

export const DateList = ({ value, setValue }) => {
  const dayList = generateDays(7);
  const [active, setActive] = useState(value);

  useEffect(() => {
    setActive(value);
  }, [value]);

  const handleClickDate = async (date) => {
    await setDateAddingToStorage(date);
    setValue(date);
    setActive(date);
  };
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={style.container}
    >
      {dayList.map((day) => (
        <DateItem
          key={day.date}
          value={day.date}
          view={day.dateOfWeek}
          active={active === day.date}
          onPress={() => handleClickDate(day.date)}
        />
      ))}
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginLeft: 22,
    paddingRight: 22,
    paddingVertical: 10,
  },
});
