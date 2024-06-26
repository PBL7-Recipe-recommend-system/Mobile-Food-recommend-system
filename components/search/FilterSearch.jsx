import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform, TextInput } from "react-native";
import CustomButton from "../CustomButton";
import { FilterButton } from "./FilterButton";
import {
  categoryFilters,
  rateFilters,
  timeFilters,
} from "../../constants/filterSelection";
import Slider from "react-native-a11y-slider";
import { PRIMARY_COLOR } from "../../constants/color";
export const FilterSearch = ({ value, setValue, onPress }) => {
  const [selectedTime, setSelectedTime] = useState(value.time);
  const [selectedRate, setSelectedRate] = useState(value.rate);
  const [selectedCategory, setSelectedCategory] = useState(value.category);
  const [rangeValue, setRangeValue] = useState([
    value.minCalories,
    value.maxCalories,
  ]);

  const handleSelectTime = (filter) => {
    setSelectedTime(filter);
    setValue({
      time: filter,
      ...value,
    });
  };
  const handleSelectRate = (filter) => {
    setSelectedRate(filter);
    setValue({
      rate: filter,
      ...value,
    });
  };

  const handleSelectCalories = (filter) => {
    setRangeValue(filter);
    const [min, max] = filter;
    setValue({
      minCalories: min,
      maxCalories: max,
      ...value,
    });
  };

  const handleSelectCategory = (filter) => {
    setSelectedCategory(filter);
    setValue({
      category: filter,
      ...value,
    });
  };

  return (
    <View style={style.container}>
      <Text style={style.filterTitle}>Filter search</Text>
      <View
        className={Platform.OS === "ios" ? "my-9" : "my-2"}
        style={[{ flex: 1, width: "100%" }]}
      >
        <View style={style.filterItemContainer}>
          <Text style={style.filterItemTitle}>Time</Text>
          <View style={style.filterItemList}>
            {timeFilters.map((filter, index) => (
              <FilterButton
                key={filter.name}
                data={filter}
                selected={selectedTime === filter.value}
                onPress={() => handleSelectTime(filter.value)}
              />
            ))}
          </View>
        </View>

        <View style={style.filterItemContainer}>
          <Text style={style.filterItemTitle}>Rate</Text>
          <View style={style.filterItemList}>
            {rateFilters.map((filter) => (
              <FilterButton
                key={filter.name}
                data={filter}
                selected={selectedRate === filter.value}
                onPress={() => handleSelectRate(filter.value)}
              />
            ))}
          </View>
        </View>

        <View style={style.filterItemContainer}>
          <Text style={style.filterItemTitle}>Category</Text>
          <View style={style.filterItemList}>
            {categoryFilters.map((filter) => (
              <FilterButton
                key={filter.name}
                data={filter}
                selected={selectedCategory === filter.value}
                onPress={() => handleSelectCategory(filter.value)}
              />
            ))}
          </View>
        </View>

        <View style={style.filterItemContainer}>
          <Text style={style.filterItemTitle}>Calories</Text>
          <Slider
            min={1}
            max={1500}
            values={rangeValue}
            onChange={(values) => handleSelectCalories(values)}
            markerColor={PRIMARY_COLOR}
            trackStyle={{
              color: PRIMARY_COLOR,
              backgroundColor: "#E5E5E5",
              borderWidth: 1,
            }}
            labelStyle={{
              borderRadius: 10,
            }}
            labelTextStyle={{
              color: "#000",
              fontSize: 12,
              fontWeight: "bold",
            }}
          />
        </View>
      </View>
      <CustomButton
        title={"Filter"}
        width={"72%"}
        height={60}
        onPressButton={() =>
          onPress({
            time: selectedTime,
            rate: selectedRate,
            category: selectedCategory,
            minCalories: rangeValue[0],
            maxCalories: rangeValue[1],
          })
        }
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterTitle: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
  },
  filterItemContainer: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
  },

  filterItemList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  filterItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
