import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { PRIMARY_COLOR } from "../../constants/color";
import { CUSTOM_TAB, RECOMMEND_TAB } from "../../constants/plan";

export const TabMenu = ({ tabValue, handleChangeTab }) => {
  return (
    <View style={style.container}>
      <TouchableOpacity
        style={[style.tab, tabValue === CUSTOM_TAB && style.tabActive]}
        onPress={() => handleChangeTab(CUSTOM_TAB)}
      >
        <Text style={[style.text, tabValue === CUSTOM_TAB && style.textActive]}>
          {CUSTOM_TAB}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[style.tab, tabValue === RECOMMEND_TAB && style.tabActive]}
        onPress={() => handleChangeTab(RECOMMEND_TAB)}
      >
        <Text
          style={[style.text, tabValue === RECOMMEND_TAB && style.textActive]}
        >
          {RECOMMEND_TAB}
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
  tabActive: {
    backgroundColor: PRIMARY_COLOR,
  },
  textActive: {
    color: "#fff",
    fontWeight: "bold",
  },
});
