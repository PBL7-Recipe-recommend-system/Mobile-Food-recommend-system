import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import caloriesIcon from "../../assets/icons/calories.png";
import clockIcon from "../../assets/icons/clock.png";

export const RecipeItem = ({ item }) => {
  const navigation = useNavigation();

  const image = Array.isArray(item.images) ? item.images[0] : item.images;

  const handleClickItem = () => {
    navigation.navigate("DetailedRecipe", {
      id: item.recipeId,
      searching: true,
    });
  };
  return (
    <TouchableOpacity
      style={[
        style.shadowBox,
        Platform.OS === "android" ? style.androidContainer : style.container,
      ]}
      onPress={handleClickItem}
    >
      <View className="m-4 ">
        <Image
          source={{ uri: image }}
          style={Platform.OS === "android" ? style.androidImage : style.image}
        />
        <Text
          style={Platform.OS === "android" ? style.androidTitle : style.title}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
        <View className="flex flex-row items-center justify-between">
          <View style={style.iconContainer}>
            <Image
              source={caloriesIcon}
              style={Platform.OS === "android" ? style.androidIcon : style.icon}
            />
            <Text
              style={
                Platform.OS === "android"
                  ? style.androidIconText
                  : style.iconText
              }
            >
              {item.calories}
            </Text>
          </View>
          <View style={style.iconContainer}>
            <Image
              source={clockIcon}
              style={Platform.OS === "android" ? style.androidIcon : style.icon}
            />
            <Text
              style={
                Platform.OS === "android"
                  ? style.androidIconText
                  : style.iconText
              }
            >
              {item.totalTime}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: 200,
    height: 240,
    borderRadius: 16,
    backgroundColor: "#fff",
    margin: 6,
  },

  androidContainer: {
    width: 160,
    height: 190,
    borderRadius: 16,
    backgroundColor: "#fff",
    margin: 6,
  },

  shadowBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  image: {
    width: 168,
    height: 128,
    borderRadius: 16,
    marginBottom: 16,
  },

  androidImage: {
    width: 128,
    height: 88,
    borderRadius: 16,
    marginBottom: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },

  androidTitle: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 8,
  },

  iconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  icon: {
    height: 16,
    width: 16,
    marginRight: 4,
  },

  androidIcon: {
    height: 12,
    width: 12,
    marginRight: 2,
  },
  iconText: {
    color: "#97a2b0",
    fontSize: 14,
  },

  androidIconText: {
    color: "#97a2b0",
    fontSize: 12,
  },
});
