import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import starIcon from "../../assets/icons/star.png";
export const SearchItem = ({ data }) => {
  return (
    <TouchableOpacity style={style.container}>
      <ImageBackground
        source={{ uri: data.images }}
        resizeMode="cover"
        style={style.image}
        imageStyle={{ borderRadius: 16 }}
      >
        <LinearGradient
          colors={["#00000000", "#A9A9A900", "#000000"]}
          style={style.gradientOverlay}
        >
          <View style={style.contentContainer}>
            <View style={style.rating}>
              <Image source={starIcon} style={style.starIcon} />
              <Text style={{ textAlign: "center", fontSize: 12 }}>
                {data.rating}
              </Text>
            </View>
            <View>
              <Text style={style.title}>{data.name}</Text>
              <Text style={style.author}>{data.authorName}</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  contentContainer: {
    flex: 1,
    padding: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    zIndex: 999,
  },
  gradientOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    margin: 8,
  },
  author: {
    color: "#a9a9a9",
    fontSize: 8,
    marginHorizontal: 8,
  },

  rating: {
    width: "36%",
    height: "18%",
    backgroundColor: "#FFE1B3",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  starIcon: {
    width: 16,
    height: 16,
    margin: 2,
    position: "relative",
    top: -1,
  },
});
