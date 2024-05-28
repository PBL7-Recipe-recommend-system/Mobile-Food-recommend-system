import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SavedList } from "../../components/saved-recipe/SavedList";
import AppWrapper from "../../wrappers/AppWrapper";

export const SavedRecipe = () => {
  return (
    <AppWrapper>
      <View style={style.container}>
        <View style={style.header}>
          <Text style={style.headerText}>Saved Recipe</Text>
        </View>
        <SavedList />
      </View>
    </AppWrapper>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  header: {
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    marginHorizontal: "auto",
  },
});
