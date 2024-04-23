import React, { useEffect, useState } from "react";
import { Text, View, Platform, StyleSheet } from "react-native";
import { CustomScrollPicker } from "../../components/CustomScrollPicker";

export const Weight = () => {
  const [weightSource, setWeightSource] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = Array.from({ length: 150 }, (_, i) => i + 1);
      setWeightSource(data);
    }

    fetchData();
  }, []);

  return (
    <View>
      <Text
        className="text-[18px] font-light text-center mb-[24px]"
        style={Platform.OS === "ios" && styles.iosText}
      >
        What is your current weight ?
      </Text>
      <View
        className="flex flex-row mt-[180px] justify-center items-center"
        style={Platform.OS === "ios" && styles.iosScrollPicker}
      >
        <CustomScrollPicker
          dataSource={weightSource}
          selectedIndex={4}
          label="Weight"
        />
        <Text className="text-gray-500 text-xl ml-3">Kg</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  iosText: {
    fontSize: 22,
  },
  iosScrollPicker: {
    marginTop: 200,
  },
});
