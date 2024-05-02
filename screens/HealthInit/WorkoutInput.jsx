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
          title="Never"
          desc="0 times a week"
          selected={selectedItem === "never"}
          onSelect={() => handleSelectItem("never")}
        />
        <HealthInputItem
          title="Sometimes"
          desc="1-2 times a week"
          selected={selectedItem === "sometimes"}
          onSelect={() => handleSelectItem("sometimes")}
        />
        <HealthInputItem
          title="Regularly"
          desc="3-4 times a week"
          selected={selectedItem === "regularly"}
          onSelect={() => handleSelectItem("regularly")}
        />
        <HealthInputItem
          title="Often"
          desc="5-6 times a week"
          selected={selectedItem === "often"}
          onSelect={() => handleSelectItem("often")}
        />
        <HealthInputItem
          title="Daily"
          desc="&ge; 7 times a week"
          selected={selectedItem === "daily"}
          onSelect={() => handleSelectItem("daily")}
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
