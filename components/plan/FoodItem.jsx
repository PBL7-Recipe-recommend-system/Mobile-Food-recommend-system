import {
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import mockData from "../../assets/mock/food1.jpg";
import { GRAY_TEXT_COLOR } from "../../constants/color";
export const FoodItem = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Breakfast</Text>
        <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
          Smoothie bowl
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
              30 min
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
              450 kcal
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={mockData} style={styles.image} />
      </View>

      <TouchableOpacity style={styles.reloadButton}>
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
    borderRadius: "50%",
  },
});
