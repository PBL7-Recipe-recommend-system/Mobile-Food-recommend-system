import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../CustomButton";
import { FilterButton } from "./FilterButton";

export const FilterSearch = () => {
  return (
    <View style={style.container}>
      <Text style={style.filterTitle}>Filter search</Text>
      <View className="my-8" style={{ flex: 1, width: "100%" }}>
        <View style={style.filterItemContainer}>
          <Text style={style.filterItemTitle}>Time</Text>
          <View style={style.filterItemList}>
            <FilterButton textLine1="All" />
            <FilterButton textLine1="Newest" />
            <FilterButton textLine1="Oldest" />
            <FilterButton textLine1="Popularity" />
          </View>
        </View>

        <View style={style.filterItemContainer}>
          <Text style={style.filterItemTitle}>Rate</Text>
          <View style={style.filterItemList}>
            <FilterButton textLine1="All" />
            <FilterButton textLine1="Newest" />
            <FilterButton textLine1="Oldest" />
            <FilterButton textLine1="Popularity" />
          </View>
        </View>

        <View style={style.filterItemContainer}>
          <Text style={style.filterItemTitle}>Category</Text>
          <View style={style.filterItemList}>
            <FilterButton textLine1="All" />
            <FilterButton textLine1="Newest" />
            <FilterButton textLine1="Oldest" />
            <FilterButton textLine1="Vegetables" />

            <FilterButton textLine1="All" />
            <FilterButton textLine1="Newest" />
            <FilterButton textLine1="Breakfast" />
            <FilterButton textLine1="Popularity" />

            <FilterButton textLine1="Spanish" />
            <FilterButton textLine1="Newest" />
            <FilterButton textLine1="Oldest" />
          </View>
        </View>
      </View>
      <CustomButton title={"Filter"} width={"72%"} height={60} />
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
