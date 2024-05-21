import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { RecipeItem } from "./RecipeItem";
import { PRIMARY_COLOR } from "../../constants/color";

export const RecipeList = ({ title, dataSource }) => {
  const [data, setData] = useState(dataSource);

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);
  return (
    <View style={{ height: "40%" }}>
      <View style={style.categoryContainer}>
        <Text className="text-xl font-bold">{title}</Text>
        <TouchableOpacity>
          <Text style={style.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data &&
          data.length > 0 &&
          data.map((recipe) => <RecipeItem key={recipe.id} item={recipe} />)}
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
  },

  seeAllText: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    fontWeight: "900",
  },
});
