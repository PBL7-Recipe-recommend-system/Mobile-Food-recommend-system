import React from "react";
import { Text, View, Platform, StyleSheet } from "react-native";
import { CustomScrollPicker } from "../../components/CustomScrollPicker";
import { useEffect, useState } from "react";

export const Height = ({ dataSource }) => {
  return (
    <View>
      <Text
        className="text-[18px] font-light text-center mb-[24px]"
        style={Platform.OS === "ios" && styles.iosText}
      >
        What is your current height ?
      </Text>
      <View
        className="flex flex-row mt-[180px] justify-center items-center"
        style={Platform.OS === "ios" && styles.iosScrollPicker}
      >
        <CustomScrollPicker
          dataSource={dataSource}
          selectedIndex={4}
          label="Height"
        />
        <Text className="text-gray-500 text-xl ml-3">cm</Text>
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
