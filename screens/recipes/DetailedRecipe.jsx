import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import { getDetailedRecipes } from "../../api/recipes";
import { BackButton } from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import { RecipeContentSheet } from "../../components/recipe/RecipeContentSheet";
import { StepContentSheet } from "../../components/recipe/StepContentSheet";
import { PRIMARY_COLOR } from "../../constants/color";
import { saveRecipe } from "../../api/saved-recipe";
export const DetailedRecipe = () => {
  const refRBSheet = useRef(null);
  const [isCooking, setIsCooking] = useState(false);
  const [serving, setServing] = useState(2);

  useEffect(() => {
    if (refRBSheet.current) {
      refRBSheet.current.open();
    }
  }, [refRBSheet]);

  const route = useRoute();
  const id = route.params.id;
  const meal = route.params.meal || "breakfast";
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getDetailedRecipes(id);
      setData(results.data);
    };
    fetchData();
  }, []);

  const handleSaveRecipe = async () => {
    await saveRecipe(id, data?.saved === true ? false : true);
    setData({ ...data, saved: data?.saved === true ? false : true });
  };

  return (
    <MenuProvider>
      {data && (
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <ImageBackground
              source={{ uri: data?.images[0] }}
              resizeMode="cover"
              style={styles.image}
            >
              <View style={styles.headerContainer}>
                <BackButton color={PRIMARY_COLOR} />
                <Menu>
                  <MenuTrigger
                    children={
                      <Entypo
                        name="dots-three-horizontal"
                        size={24}
                        color={PRIMARY_COLOR}
                      />
                    }
                  />
                  <MenuOptions customStyles={optionsStyles}>
                    <MenuOption onSelect={handleSaveRecipe}>
                      <View className="flex-row ">
                        <MaterialCommunityIcons
                          name="bookmark"
                          size={24}
                          color="black"
                        />
                        <Text className="ml-[26%]">
                          {data?.saved === true ? "Unsave" : "Save"}
                        </Text>
                      </View>
                    </MenuOption>
                    <MenuOption onSelect={() => alert(`Delete`)}>
                      <View className="flex-row ">
                        <MaterialCommunityIcons
                          name="share"
                          size={24}
                          color="black"
                        />
                        <Text className="ml-[26%]">Share</Text>
                      </View>
                    </MenuOption>
                    <MenuOption onSelect={() => alert(`Not called`)}>
                      <View className="flex-row ">
                        <MaterialCommunityIcons
                          name="star"
                          size={24}
                          color="black"
                        />
                        <Text className="ml-[26%]">Rate</Text>
                      </View>
                    </MenuOption>
                    <MenuOption onSelect={() => alert(`Not called`)}>
                      <View className="flex-row ">
                        <MaterialCommunityIcons
                          name="comment"
                          size={24}
                          color="black"
                        />
                        <Text className="ml-[26%]">Review</Text>
                      </View>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            </ImageBackground>
          </View>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {isCooking ? (
                <StepContentSheet
                  data={data}
                  setIsCooking={setIsCooking}
                  baseServing={serving}
                  meal={meal}
                />
              ) : (
                <RecipeContentSheet
                  data={data}
                  handleSetServing={setServing}
                  baseServing={serving}
                />
              )}

              {!isCooking ? (
                <View
                  className="items-center mt-2"
                  style={{
                    justifyContent: "center",
                    height: "28%",
                  }}
                >
                  <CustomButton
                    title="Start cooking"
                    width={"80%"}
                    height={"40%"}
                    onPressButton={() => setIsCooking(true)}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </View>
      )}
    </MenuProvider>
  );
};

const optionsStyles = {
  optionsContainer: {
    padding: 5,
    width: "38%",
    borderRadius: 16,
  },
  optionWrapper: {
    margin: 2,
  },
};

const styles = StyleSheet.create({
  container: {
    height: "38%",
  },
  image: {
    flex: 1,
    justifyContent: "flex-start",
  },

  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: "16%",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    borderRadius: 16,
  },
});
