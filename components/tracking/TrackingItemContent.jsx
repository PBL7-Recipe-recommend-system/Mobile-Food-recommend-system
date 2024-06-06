import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
export const TrackingItemContent = ({ data }) => {
  return (
    <View style={style.container}>
      <View style={style.contentItem}>
        <Text style={style.title}>Protein</Text>
        <Text style={style.title}>{data?.proteinContent} g</Text>
      </View>
      <View style={style.contentItem}>
        <Text style={style.title}>Fat</Text>
        <Text style={style.title}>{data?.fatPercentage} g</Text>
      </View>
      <View style={style.contentItem}>
        <Text style={style.title}>Carbs</Text>
        <Text style={style.title}>{data?.carbohydrateContent} g</Text>
      </View>
      <View style={style.contentItem}>
        <Text style={style.title}>Fiber</Text>
        <Text style={style.title}>{data?.fiberContent} g</Text>
      </View>
      <View style={style.contentItem}>
        <Text style={style.title}>Sugar</Text>
        <Text style={style.title}>{data?.sugarContent} g</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  contentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "100%",
  },
  title: {
    fontWeight: "500",
    color: "#9DA8C3",
  },
});
