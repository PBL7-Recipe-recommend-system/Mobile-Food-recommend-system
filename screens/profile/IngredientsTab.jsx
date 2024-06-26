import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PRIMARY_COLOR } from "../../constants/color";
import { EXCLUDE_TAB, INCLUDE_TAB } from "../../constants/plan";

export const IngredientsTab = ({ tabValue, handleChangeTab }) => {
  return (
    <View style={style.container}>
      <TouchableOpacity
        style={[style.tab, tabValue === INCLUDE_TAB && style.tabActive]}
        onPress={() => handleChangeTab(INCLUDE_TAB)}
      >
        <Text
          style={[style.text, tabValue === INCLUDE_TAB && style.textActive]}
        >
          Include
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[style.tab, tabValue === EXCLUDE_TAB && style.excludeTabActive]}
        onPress={() => handleChangeTab(EXCLUDE_TAB)}
      >
        <Text
          style={[style.text, tabValue === EXCLUDE_TAB && style.textActive]}
        >
          Exclude
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tab: {
    width: "50%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  text: {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
  },
  excludeText: {
    color: "red",
    fontWeight: "bold",
  },
  tabActive: {
    backgroundColor: PRIMARY_COLOR,
  },
  excludeTabActive: {
    backgroundColor: "red",
  },
  textActive: {
    color: "#fff",
    fontWeight: "bold",
  },
});
