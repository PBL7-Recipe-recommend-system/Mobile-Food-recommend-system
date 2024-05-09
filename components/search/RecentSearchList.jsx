import React, { useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { RecentSearchItem } from "./RecentSearchItem";

const data = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
  { id: "7" },
  { id: "8" },
  { id: "9" },
  { id: "10" },
  { id: "11" },
  { id: "12" },
  { id: "13" },
];

const groupItems = (items) => {
  const grouped = [];
  for (let i = 0; i < items.length; i += 2) {
    grouped.push(items.slice(i, i + 2));
  }
  return grouped;
};

export const RecentSearchList = () => {
  const groupedData = groupItems(data);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <View style={styles.itemContainer}>
          <RecentSearchItem data={item[0]} />
        </View>
        {item[1] && (
          <View style={styles.itemContainer}>
            <RecentSearchItem data={item[1]} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <Text className="text-xl font-bold">Recent Search</Text>
      <FlatList
        data={groupedData}
        renderItem={renderItem}
        scrollEnabled={false}
        keyExtractor={(item, index) => `row-${index}`}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  itemContainer: {
    width: "48%",
    aspectRatio: 1,
  },
});
