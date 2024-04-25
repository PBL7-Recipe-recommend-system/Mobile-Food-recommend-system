import React from "react";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { Text, View } from "react-native";

export const CustomScrollPicker = ({ dataSource, selectedIndex }) => {
  return (
    <View className="mx-2">
      <ScrollPicker
        dataSource={dataSource}
        selectedIndex={selectedIndex}
        renderItem={(data, index) => {
          return (
            <View className="w-[80px]">
              <Text className="text-center">{data}</Text>
            </View>
          );
        }}
        onValueChange={(data, selectedIndex) => {
          //
        }}
        wrapperHeight={160}
        wrapperWidth={150}
        itemHeight={52}
        highlightColor="#ccc"
        highlightBorderWidth={2}
        wrapperBackground="#fff"
      />
    </View>
  );
};
