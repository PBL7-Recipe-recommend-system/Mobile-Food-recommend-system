import React from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import loseWeightIcon from "../../assets/images/loseWeight.png";
import gainWeightIcon from "../../assets/images/gainWeight.png";
import healthyIcon from "../../assets/images/healthy.png";

const LOSE_WEIGHT = 1;
const GAIN_WEIGHT = 2;
const HEALTHY = 3;
export const Goal = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const selectGoal = (id) => {
    setSelectedGoal(id);
  };
  return (
    <View style={styles.container}>
      <Text
        className="text-[18px] font-light text-center mb-6"
        style={Platform.OS === "ios" && styles.iosText}
      >
        What is your goal ?
      </Text>

      <View style={styles.contentContainer} className="shadow-sm">
        <TouchableOpacity
          style={[styles.button, selectedGoal === LOSE_WEIGHT && styles.active]}
          onPress={() => selectGoal(LOSE_WEIGHT)}
        >
          <Text
            style={[
              styles.text,
              selectedGoal === LOSE_WEIGHT && styles.activeText,
            ]}
          >
            Lose weight
          </Text>
          <Image source={loseWeightIcon} style={styles.goalImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedGoal === GAIN_WEIGHT && styles.active]}
          onPress={() => selectGoal(GAIN_WEIGHT)}
        >
          <Text
            style={[
              styles.text,
              selectedGoal === GAIN_WEIGHT && styles.activeText,
            ]}
          >
            Gain weight
          </Text>
          <Image source={gainWeightIcon} style={styles.goalImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedGoal === HEALTHY && styles.active]}
          onPress={() => selectGoal(HEALTHY)}
        >
          <Text
            style={[styles.text, selectedGoal === HEALTHY && styles.activeText]}
          >
            Healthy
          </Text>
          <Image source={healthyIcon} style={styles.goalImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
  button: {
    width: "100%",
    height: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F6F7F7",
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  goalImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  text: {
    color: "#617D79",
    fontWeight: "bold",
  },
  active: {
    backgroundColor: "#d5dbe0",
  },

  activeText: {
    color: "#000000",
  },
});
