import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const TrackingItemTitle = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("DetailedRecipe", { id: data.recipeId })
        }
        style={style.container}
      >
        <View
          style={{
            borderRadius: 10,
          }}
        >
          <Image
            source={{
              uri: data.image,
            }}
            style={style.image}
            resizeMode="cover"
          />
        </View>
        <View style={{ width: "77%", justifyContent: "center" }}>
          <Text style={style.nameMeals} numberOfLines={3} ellipsizeMode="tail">
            {data.name}
          </Text>
        </View>
      </TouchableOpacity>
      <View className="flex flex-row justify-between">
        <Text className="my-2">{data?.servings} servings</Text>
        <Text className="my-2">{Number(data?.calories).toFixed(1)} kcal</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 10,
  },
  nameMeals: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});
