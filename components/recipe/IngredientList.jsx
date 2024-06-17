import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Fraction from "fraction.js";
import { parseFraction } from "../../utils/formatData";
export const IngredientList = ({
  dataSource,
  quantities,
  baseServing,
  serving,
}) => {
  return (
    <ScrollView className="my-2" contentContainerStyle={style.ingredientsList}>
      {dataSource.map((item, index) => (
        <React.Fragment key={index}>
          <View
            style={style.ingredientItem}
            className="flex flex-row justify-start "
          >
            <Text className="text-[16px] text-left">
              {quantities[index] !== "None" &&
                `${new Fraction(
                  (parseFraction(quantities[index]) / baseServing) * serving
                ).toFraction(true)} `}
              {item}
            </Text>
          </View>
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  ingredientsList: {
    flexGrow: 1,
  },
  ingredientItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
});
