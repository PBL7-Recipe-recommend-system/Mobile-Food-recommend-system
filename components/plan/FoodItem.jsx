import {
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import mockData from "../../assets/mock/food1.jpg";
import { GRAY_TEXT_COLOR } from "../../constants/color";
import { useNavigation } from "@react-navigation/native";
import { CUSTOM_TAB, RECOMMEND_TAB } from "../../constants/plan";
import {
  getDateAddingFromStorage,
  getMealAddingFromStorage,
} from "../../utils/asyncStorageUtils";
import { Popup } from "react-native-popup-confirm-toast";
import { toCamelCase } from "../../utils/formatData";
import { getMealPlan, removeRecipeFromPlan } from "../../api/plan";

export const FoodItem = ({ item, meal, planType, handleRemoveMeals }) => {
  const [mealIndex, setMealIndex] = useState(0);
  const [data, setData] = useState(item);
  const navigation = useNavigation();

  const getImage = (obj) => {
    if (planType === RECOMMEND_TAB) {
      return obj.images[0];
    } else return obj.image;
  };

  useEffect(() => {
    setData(item);
  }, [item]);

  useEffect(() => {
    const fetch = async () => {
      console.log("Fetching data >>> ", meal, " ???  ", item);
    };
    fetch();
  }, []);

  const handleDetailClick = () => {
    navigation.navigate("DetailedRecipe", {
      id: item[mealIndex].recipeId,
      meal: meal,
    });
  };
  const handleChangeReload = () => {
    if (mealIndex === data.length - 1) {
      setMealIndex(0);
    } else setMealIndex(mealIndex + 1);
  };

  const handleLongPress = async () => {
    const date = await getDateAddingFromStorage();
    const param = {
      date: date,
      [toCamelCase(meal)]: item[mealIndex].recipeId,
    };

    console.log("Item has been long pressed", param);
    Popup.show({
      type: "confirm",
      title: "Confirm!",
      textBody: "Do you want to delete this meals?",
      buttonText: "Delete",
      confirmText: "Cancel",
      callback: async () => {
        await removeRecipeFromPlan(param);
        await getMealPlan();
        handleRemoveMeals(meal);
        Popup.hide();
      },
      cancelCallback: () => {
        Popup.hide();
      },
      okButtonStyle: { backgroundColor: "red" },
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleDetailClick}
      onLongPress={planType === CUSTOM_TAB ? handleLongPress : null}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{meal}</Text>
        <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
          {item[mealIndex].name}
        </Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsText}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={24}
              color="#999"
            />
            <Text
              style={{
                fontSize: 12,
                color: "#999",
                fontWeight: "bold",
              }}
            >
              {item[mealIndex].totalTime}
            </Text>
          </View>

          <View style={styles.detailsText}>
            <SimpleLineIcons name="fire" size={24} color="#999" />
            <Text
              style={{
                fontSize: 12,
                color: "#999",
                fontWeight: "bold",
              }}
            >
              {item[mealIndex].calories} kcal
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: getImage(item[mealIndex]) }}
          style={styles.image}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.reloadButton,
          planType === CUSTOM_TAB && { display: "none" },
        ]}
        onPress={handleChangeReload}
      >
        <Feather name="refresh-cw" size={24} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "auto",
    height: 100,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 10,
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  imageContainer: {
    width: "40%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  infoContainer: {
    padding: 10,
    width: "60%",
  },
  title: {
    fontSize: 14,
    fontWeight: "semibold",
    color: GRAY_TEXT_COLOR,
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginVertical: 5,
  },
  detailsContainer: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  reloadButton: {
    position: "absolute",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});
