import { useState, useEffect } from "react";
import { Text, View, Platform, StyleSheet } from "react-native";
import { HealthInputItem } from "../../components/HealthInputItem";

export const WorkoutInput = ({ updateValue, defaultValue }) => {
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
        How often do you workout ?
      </Text>
      <View style={[styles.itemContainer]}>
        <HealthInputItem
          title="Little/no exercise"
          desc="0-1 times a week"
          selected={selectedItem === "Little/no exercise"}
          onSelect={() => handleSelectItem("Little/no exercise")}
        />
        <HealthInputItem
          title="Light exercise"
          desc="1-2 times a week"
          selected={selectedItem === "Light exercise"}
          onSelect={() => handleSelectItem("Light exercise")}
        />
        <HealthInputItem
          title="Moderate exercise"
          desc="3-5 times a week"
          selected={selectedItem === "Moderate exercise (3-5 days/wk)"}
          onSelect={() => handleSelectItem("Moderate exercise (3-5 days/wk)")}
        />
        <HealthInputItem
          title="Very active"
          desc="6-7 times a week"
          selected={selectedItem === "Very active (6-7 days/wk)"}
          onSelect={() => handleSelectItem("Very active (6-7 days/wk)")}
        />
        <HealthInputItem
          title="Extra active "
          desc="Very active & physical job"
          selected={
            selectedItem === "Extra active (very active & physical job)"
          }
          onSelect={() =>
            handleSelectItem("Extra active (very active & physical job)")
          }
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
    transform: [{ translateY: 100 }],
  },
});
