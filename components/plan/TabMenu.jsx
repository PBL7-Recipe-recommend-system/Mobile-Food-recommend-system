import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { PRIMARY_COLOR } from "../../constants/color";

export const TabMenu = () => {
  const [activeTab, setActiveTab] = useState("Custom Plan");
  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={[style.tab, activeTab === "Custom Plan" && style.tabActive]}
        onPress={() => setActiveTab("Custom Plan")}
      >
        <Text
          style={[style.text, activeTab === "Custom Plan" && style.textActive]}
        >
          Custom Plan
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[style.tab, activeTab === "Recommend Plan" && style.tabActive]}
        onPress={() => setActiveTab("Recommend Plan")}
      >
        <Text
          style={[
            style.text,
            activeTab === "Recommend Plan" && style.textActive,
          ]}
        >
          Recommend Plan
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
