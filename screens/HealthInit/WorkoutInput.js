import React from "react";
import { Text, View, Platform, StyleSheet } from "react-native";
import { HealthInputItem } from "../../components/HealthInputItem";

export const WorkoutInput = () => {
  return (
    <View>
      <Text
        className="text-[18px] font-light text-center mb-[24px]"
        style={Platform.OS === "ios" && styles.iosText}
      >
        How often do you workout ?
      </Text>
      <View
        className="flex flex-row mt-[180px] justify-center items-center"
        style={Platform.OS === "ios" && styles.iosScrollPicker}
      >
        <HealthInputItem title="Everyday" desc="I workout everyday" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  iosText: {
    fontSize: 22,
  },
  iosScrollPicker: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
});
