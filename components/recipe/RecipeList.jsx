import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { PRIMARY_COLOR } from "../../constants/color";
import { RecipeItem } from "./RecipeItem";

export const RecipeList = ({ title, dataSource }) => {
  const [data, setData] = useState(dataSource);

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);
  return (
    <View style={{ flex: 1 }}>
      <View style={style.categoryContainer}>
        <Text className="text-xl font-bold">{title}</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.recipeList}
      >
        {data &&
          data.length > 0 &&
          data.map((recipe) => {
            return <RecipeItem key={recipe.recipeId} item={recipe} />;
          })}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
    paddingHorizontal: 30,
  },

  seeAllText: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    fontWeight: "900",
  },
  recipeList: {
    left: 30,
    paddingRight: 60,
  },
});
