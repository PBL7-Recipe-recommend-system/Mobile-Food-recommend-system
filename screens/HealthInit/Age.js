import React, { useMemo, useState } from "react";

import { Text, View, StyleSheet, Platform } from "react-native";
import { CustomScrollPicker } from "../../components/CustomScrollPicker";
export const Age = ({ navigation }) => {
  const currentDate = useMemo(() => new Date(), []);
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysSource = useMemo(
    () => Array.from({ length: 31 }, (_, i) => i + 1),
    []
  );
  const monthNames = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const yearsSource = useMemo(
    () => Array.from({ length: 101 }, (_, i) => currentYear - i),
    [currentYear]
  );

  return (
    <View>
      <Text
        className="text-[18px] font-light text-center"
        style={Platform.OS === "ios" && styles.iosText}
      >
        Please complete your profile
        {"\n"}
        What is your birthday?
      </Text>
      <View
        className="flex flex-row mt-[180px]"
        style={Platform.OS === "ios" && styles.iosScrollPicker}
      >
        <CustomScrollPicker
          dataSource={monthNames}
          selectedIndex={currentMonth}
          label="Month"
        />
        <CustomScrollPicker
          dataSource={daysSource}
          selectedIndex={currentDay - 1}
          label="Day"
        />
        <CustomScrollPicker
          dataSource={yearsSource}
          selectedIndex={0}
          label="Year"
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
