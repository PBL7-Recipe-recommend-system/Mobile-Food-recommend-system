import React from "react";
import AppWrapper from "../../wrappers/AppWrapper";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import defaultAvt from "../../assets/images/avatar.png";
import global from "../../Styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { SearchBar } from "../../components/SearchBar";
import { SelectionButton } from "../../components/SelectionButton";
import { CategoryList } from "../../components/category/CategoryList";
import { RecipeList } from "../../components/recipe/RecipeList";
export const Home = () => {
  const onSearchBarPress = () => {
    console.log("Search bar pressed");
  };
  return (
    <AppWrapper>
      <ScrollView contentContainerStyle={[style.container]}>
        <View style={style.headerContainer}>
          <View>
            <View style={style.greeting}>
              <Feather name="sun" size={24} color="#129575" />
              <Text className="text-[14px] ml-1">Good Morning</Text>
            </View>
            <Text className="font-extrabold text-2xl text-[#0A2533]">
              Alena Sabyan
            </Text>
          </View>
          <Image source={defaultAvt} style={style.avt} />
        </View>
        <View style={style.searchContainer}>
          <SearchBar onSearchBarPress={onSearchBarPress} />
          <TouchableOpacity style={style.filterButton}>
            <Ionicons name="filter-outline" size={26} color="white" />
          </TouchableOpacity>
        </View>
        <View style={style.categoryContainer} className="w-full">
          <Text className="text-xl font-black">Category</Text>
          <TouchableOpacity>
            <Text style={style.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        <View className="h-16 items-center ">
          <CategoryList />
        </View>
        <RecipeList title="Your recipes" />
        <RecipeList title="Popular recipes" />
      </ScrollView>
    </AppWrapper>
  );
};

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginVertical: 30,
    paddingBottom: 60,
    alignItems: "flex-start",
  },
  filterButton: {
    width: 50,
    height: 50,
    backgroundColor: "#129575",
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  avt: {
    width: 50,
    height: 50,
    borderRadius: 12,
    resizeMode: "contain",
    backgroundColor: "#FFCE80",
  },
  searchContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  seeAllText: {
    fontSize: 14,
    color: "#129575",
    fontWeight: "900",
  },
});
