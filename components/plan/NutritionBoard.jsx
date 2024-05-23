import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/color";
import CustomButton from "../CustomButton";
export const NutritionBoard = () => {
  return (
    <View style={style.container}>
      <Text style={style.nutritionText}>Nutrition value</Text>
      <View style={style.content}>
        <View style={style.item}>
          <AnimatedProgressWheel
            size={100}
            width={10}
            rotation={"-90deg"}
            color={"#957DC9"}
            progress={60}
            animateFromValue={0}
            duration={3000}
            backgroundColor={SECONDARY_COLOR}
            showProgressLabel={true}
            rounded={true}
          />
          <Text style={style.nutritionText}>Calories</Text>
        </View>

        <View style={style.item}>
          <AnimatedProgressWheel
            size={100}
            width={10}
            rotation={"-90deg"}
            color={"#86BA32"}
            progress={60}
            animateFromValue={0}
            duration={3000}
            backgroundColor={SECONDARY_COLOR}
            showProgressLabel={true}
            rounded={true}
          />
          <Text style={style.nutritionText}>Protein</Text>
        </View>

        <View style={style.item}>
          <AnimatedProgressWheel
            size={100}
            width={10}
            rotation={"-90deg"}
            color={"#AD5523"}
            progress={60}
            animateFromValue={0}
            duration={3000}
            backgroundColor={SECONDARY_COLOR}
            showProgressLabel={true}
            rounded={true}
          />
          <Text style={style.nutritionText}>Fat</Text>
        </View>
      </View>
      <View className="flex flex-row justify-between">
        <Text style={style.nutritionText}>Total:</Text>
        <Text style={style.nutritionText}>1982 kcal</Text>
      </View>
      <CustomButton
        title={"Save changes"}
        height={"16%"}
        width={"60%"}
        customStyle={style.button}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  item: {
    display: "flex",
    alignItems: "center",
  },
  nutritionText: {
    color: PRIMARY_COLOR,
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  button: {
    marginHorizontal: "auto",
  },
});
