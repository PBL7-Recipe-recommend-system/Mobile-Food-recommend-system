import React, { useEffect, useMemo, useState } from "react";

import { Text, View, StyleSheet, Platform, ScrollView } from "react-native";
import { CustomScrollPicker } from "../../components/CustomScrollPicker";
import { daysSource, monthNames, monthValues } from "../../constants/mockData";
export const Age = ({ updateValue }) => {
  const currentDate = useMemo(() => new Date(), []);
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth + 1);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const yearsSource = useMemo(
    () => Array.from({ length: 101 }, (_, i) => currentYear - i),
    [currentYear]
  );

  useEffect(() => {
    const dayWithTwoDigits = String(selectedDay).padStart(2, "0");
    const monthWithTwoDigits = String(selectedMonth).padStart(2, "0");
    const date = `${dayWithTwoDigits}-${monthWithTwoDigits}-${selectedYear}`;

    updateValue(date);
  }, [selectedDay, selectedMonth, selectedYear]); // Assuming updateValue does not change or is wrapped with useCallback

  return (
    <View style={{ flex: 1, paddingHorizontal: 30 }}>
      <Text
        className="text-[18px] font-light text-center"
        style={[Platform.OS === "ios" && styles.iosText]}
      >
        Please complete your profile
        {"\n"}
        What is your birthday?
      </Text>
      <View
        className="flex flex-row justify-between"
        style={{ transform: [{ translateY: 200 }] }}
      >
        <CustomScrollPicker
          dataSource={monthNames}
          selectedIndex={currentMonth}
          label="Month"
          onValueChange={(data) => {
            const selectedKey = monthValues.find(
              (month) => month.value === data
            )?.key;
            setSelectedMonth(selectedKey);
          }}
        />
        <View className="mx-2">
          <CustomScrollPicker
            dataSource={daysSource}
            selectedIndex={currentDay - 1}
            label="Day"
            onValueChange={(data) => setSelectedDay(data)}
          />
        </View>
        <CustomScrollPicker
          dataSource={yearsSource}
          selectedIndex={0}
          label="Year"
          onValueChange={(data) => setSelectedYear(data)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iosText: {
    fontSize: 22,
  },
  iosScrollPicker: {
    marginTop: 200,
  },
});
