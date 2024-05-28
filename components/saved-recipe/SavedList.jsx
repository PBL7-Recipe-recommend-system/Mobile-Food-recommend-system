import React from "react";
import { ScrollView } from "react-native";
import { SavedItem } from "./SavedItem";

export const SavedList = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SavedItem />
      <SavedItem />
      <SavedItem />
      <SavedItem />
      <SavedItem />
      <SavedItem />
      <SavedItem />
    </ScrollView>
  );
};
