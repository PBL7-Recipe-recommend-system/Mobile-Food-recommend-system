import React from "react";
import { Text, View, Platform, StyleSheet } from "react-native";
import { CustomScrollPicker } from "../../components/CustomScrollPicker";
import { useEffect, useState } from "react";
import { dataHeight } from "../../constants/mockData";

export const Height = ({ updateValue }) => {
  const defaultHeight = 70;
  const [selectedHeight, setSelectedHeight] = useState(defaultHeight);
  useEffect(() => {
    updateValue(selectedHeight);
  }, [selectedHeight]);
  return (
    <View style={styles.container}>
      <Text
        className="text-[18px] font-light text-center mb-6"
        style={Platform.OS === "ios" && styles.iosText}
      >
        What is your current height ?
      </Text>
      <View style={[styles.picker, Platform.OS === "ios" && { width: 120 }]}>
        <CustomScrollPicker
          dataSource={dataHeight}
          selectedIndex={defaultHeight - 1}
          label="Height"
          onValueChange={(data) => setSelectedHeight(data)}
        />
        <Text
          className="text-gray-500 text-xl ml-3"
          style={Platform.OS === "ios" && { fontSize: 28 }}
        >
          cm
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
