import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { getDetailedRecipes } from "../../api/recipes";
import { saveRecipe } from "../../api/saved-recipe";
import { BackButton } from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import { Loading } from "../../components/Loading";
import { RecipeContentSheet } from "../../components/recipe/RecipeContentSheet";
import { StepContentSheet } from "../../components/recipe/StepContentSheet";
import { PRIMARY_COLOR } from "../../constants/color";
export const DetailedRecipe = () => {
  const refRBSheet = useRef(null);
  const [isCooking, setIsCooking] = useState(false);
  const [serving, setServing] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (refRBSheet.current) {
      refRBSheet.current.open();
    }
  }, [refRBSheet]);

  const route = useRoute();
  const id = route.params.id;
  const meal = route.params.meal || "breakfast";
  const searching = route.params.searching || false;
  const [isSaved, setIsSaved] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getDetailedRecipes(id);
      setServing(results.data.recipeServings);
      setData(results.data);
      setIsSaved(results.data.saved);
    };
    fetchData();
  }, []);

  const handleSaveRecipe = async () => {
    setIsLoading(true);
    await saveRecipe(id, data?.saved === true ? false : true);
    setIsSaved(!isSaved);
    setData({ ...data, saved: data?.saved === true ? false : true });
    setIsLoading(false);
  };

  return (
    <MenuProvider>
      <Loading loading={isLoading} />
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
                <TouchableOpacity
                  className="flex-row "
                  onPress={handleSaveRecipe}
                >
                  <Ionicons
                    name={isSaved ? "bookmark" : "bookmark-outline"}
                    size={30}
                    color={isSaved ? PRIMARY_COLOR : "white"}
                  />
                </TouchableOpacity>
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
                  searching={searching}
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
      {/* <RatingModal visible={openRating} /> */}
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
