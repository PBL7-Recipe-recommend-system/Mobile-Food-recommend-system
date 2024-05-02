import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import complete from "../../assets/images/complete.png";

export const CompleteSetUp = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          transform: [{ translateY: -100 }],
        }}
      >
        <Image source={complete} style={styles.image} />
        <Text className="text-[28px] font-bold flex-row flex-nowrap text-center">
          Your personal <Text className="text-[#129575] ">program</Text> {"\n"}
          is ready
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 260,
    height: 260,
    resizeMode: "contain",
  },
});
