import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BackButton } from "../BackButton";

export const SearchHeader = ({ navigation, goBack }) => {
  return (
    <View style={styles.container}>
      <BackButton onPress={goBack} />
      <Text style={styles.title}>Search recipes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 16,
  },
  backIcon: {
    color: "#000000",
    marginRight: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -58 }],
  },
});
