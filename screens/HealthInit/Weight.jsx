import React, { useEffect, useState } from "react";
import { Text, View, Platform, StyleSheet } from "react-native";
import { CustomScrollPicker } from "../../components/CustomScrollPicker";
import { dataWeight } from "../../constants/mockData";

export const Weight = ({ updateValue }) => {
  const defaultWeight = 70;
  const [selectedWeight, setSelectedWeight] = useState(defaultWeight);
  useEffect(() => {
    updateValue(selectedWeight);
  }, [selectedWeight]);
  return (
    <View style={styles.container}>
      <Text
        className="text-[18px] font-light text-center mb-6"
        style={Platform.OS === "ios" && styles.iosText}
      >
        What is your current weight ?
      </Text>
      <View style={[styles.picker, Platform.OS === "ios" && { width: 120 }]}>
        <CustomScrollPicker
          dataSource={dataWeight}
          selectedIndex={defaultWeight - 1}
          label="Weight"
          onValueChange={(data) => setSelectedWeight(data)}
        />
        <Text
          className="text-gray-500 text-xl ml-3"
          style={Platform.OS === "ios" && { fontSize: 28 }}
        >
          Kg
        </Text>
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
  picker: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    transform: [{ translateY: 200 }],
    width: 100,
    justifyContent: "center",
  },
});
