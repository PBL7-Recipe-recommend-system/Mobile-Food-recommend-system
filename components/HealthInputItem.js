import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const HealthInputItem = ({ selected, title, desc }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Text>{title}</Text>
        <Text>{desc}</Text>
      </View>
      <View></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderBottomWidth: 2,
    borderBottomColor: "#E5E5E5",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
