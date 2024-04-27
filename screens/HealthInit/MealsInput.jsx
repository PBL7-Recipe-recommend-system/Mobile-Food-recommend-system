import React, { useEffect, useState } from "react";
import { Text, View, Platform, StyleSheet } from "react-native";
import { HealthInputItem } from "../../components/HealthInputItem";

export const MealsInput = ({ updateValue, defaultValue }) => {
  const [selectedItem, setSelectedItem] = useState(defaultValue);

  useEffect(() => {
    updateValue(selectedItem);
  }, [selectedItem]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };
  return (
    <View style={styles.container}>
      <Text
        className="text-[18px] font-light text-center mb-[24px]"
        style={Platform.OS === "ios" && styles.iosText}
      >
        How many meals do you want?
      </Text>
      <View style={[styles.itemContainer]}>
        <HealthInputItem
          title="3 meals"
          desc="Breakfast, Lunch, Dinner"
          selected={selectedItem === "3"}
          onSelect={() => handleSelectItem("3")}
        />
        <HealthInputItem
          title="4 meals"
          desc="Breakfast,Morning Snack ,Lunch, Dinner"
          selected={selectedItem === "4"}
          onSelect={() => handleSelectItem("4")}
        />
        <HealthInputItem
          title="5 meals"
          desc="Breakfast,Morning Snack ,Lunch, Afternoon Snack, Dinner"
          selected={selectedItem === "5"}
          onSelect={() => handleSelectItem("5")}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  iosText: {
    fontSize: 22,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transform: [{ translateY: 150 }],
  },
});
