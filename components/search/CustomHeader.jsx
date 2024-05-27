import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BackButton } from "../BackButton";

export const CustomHeader = ({ goBack, title }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
        }}
      >
        <BackButton onPress={goBack} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 16,
    position: "relative",
  },
  backIcon: {
    color: "#000000",
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    marginHorizontal: "auto",
  },
  button: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});
