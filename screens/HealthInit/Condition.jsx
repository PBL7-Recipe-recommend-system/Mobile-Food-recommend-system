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
import healthyIcon from "../../assets/images/healthy-condition.png";
import heartDiseaseIcon from "../../assets/images/heart-disease.png";
import diabetesIcon from "../../assets/images/diabetes.png";
import hypertensionIcon from "../../assets/images/hypertension.png";
import obesityIcon from "../../assets/images/obesity.png";

const HEART_DISEASE = "heart disease";
const DIABETES = "diabetes";
const HYPERTENSION = "hypertension";
const OBESITY = "obesity";
const NONE = "";
export const Condition = ({ updateValue, defaultValue }) => {
  const [selectedCondition, setSelectedCondition] = useState(defaultValue);
  useEffect(() => {
    updateValue(selectedCondition);
  }, [selectedCondition]);
  const selectGoal = (id) => {
    setSelectedCondition(id);
  };
  return (
    <View style={styles.container}>
      <Text
        className="text-[18px] font-light text-center mb-6"
        style={Platform.OS === "ios" && styles.iosText}
      >
        Do you have any of these diseases?
      </Text>

      <View style={styles.contentContainer} className="shadow-sm">
        <TouchableOpacity
          style={[
            styles.button,
            selectedCondition === HEART_DISEASE && styles.active,
          ]}
          onPress={() => selectGoal(HEART_DISEASE)}
        >
          <Text
            style={[
              styles.text,
              selectedCondition === HEART_DISEASE && styles.activeText,
            ]}
          >
            Heart Disease
          </Text>
          <Image source={heartDiseaseIcon} style={styles.goalImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedCondition === DIABETES && styles.active,
          ]}
          onPress={() => selectGoal(DIABETES)}
        >
          <Text
            style={[
              styles.text,
              selectedCondition === DIABETES && styles.activeText,
            ]}
          >
            Diabetes
          </Text>
          <Image source={diabetesIcon} style={styles.goalImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedCondition === HYPERTENSION && styles.active,
          ]}
          onPress={() => selectGoal(HYPERTENSION)}
        >
          <Text
            style={[
              styles.text,
              selectedCondition === HYPERTENSION && styles.activeText,
            ]}
          >
            Hypertension
          </Text>
          <Image source={hypertensionIcon} style={styles.goalImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedCondition === OBESITY && styles.active,
          ]}
          onPress={() => selectGoal(OBESITY)}
        >
          <Text
            style={[
              styles.text,
              selectedCondition === OBESITY && styles.activeText,
            ]}
          >
            Obesity
          </Text>
          <Image source={obesityIcon} style={styles.goalImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedCondition === NONE && styles.active]}
          onPress={() => selectGoal(NONE)}
        >
          <Text
            style={[
              styles.text,
              selectedCondition === NONE && styles.activeText,
            ]}
          >
            No, I don't.
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
    height: "12%",
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
