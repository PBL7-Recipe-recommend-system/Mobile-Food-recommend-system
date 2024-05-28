import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import starIcon from "../../assets/icons/star.png";
import clockIcon from "../../assets/icons/clock-white.png";
import { SavedButton } from "./SavedButton";

export const SavedItem = () => {
  return (
    <View style={style.container}>
      <ImageBackground
        source={require("../../assets/mock/food1.jpg")}
        resizeMode="cover"
        style={style.image}
      >
        <LinearGradient
          colors={["#00000000", "#A9A9A900", "#000009"]}
          style={style.gradientOverlay}
        >
          <View style={style.rating}>
            <Image source={starIcon} style={style.starIcon} />
            <Text style={{ textAlign: "center", fontSize: 12 }}>2</Text>
          </View>
          <View style={style.content}>
            <View style={style.leftContent}>
              <Text style={style.nameRecipe}>Food name with long content</Text>
              <Text style={style.nameAuthor}>By Chef John</Text>
            </View>
            <View style={style.rightContent}>
              <View style={style.timeIcon}>
                <Image source={clockIcon} style={style.starIcon} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "300",
                    color: "#ffffff",
                  }}
                >
                  20 min
                </Text>
              </View>
              <SavedButton />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 140,
    borderRadius: 10,
    marginVertical: 10,
    overflow: "hidden",
  },

  image: { width: "100%", height: "100%" },

  gradientOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  rating: {
    width: "16%",
    height: "18%",
    backgroundColor: "#FFE1B3",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    margin: "4%",
  },

  starIcon: {
    width: 16,
    height: 16,
    margin: 2,
    position: "relative",
    top: -1,
  },

  content: {
    height: "60%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },

  nameRecipe: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    textAlign: "left",
  },

  nameAuthor: {
    fontSize: 12,
    color: "#ffffff",
    textAlign: "center",
    textAlign: "left",
  },
  leftContent: {
    width: "64%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
  },
  rightContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    height: "50%",
  },
  timeIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
