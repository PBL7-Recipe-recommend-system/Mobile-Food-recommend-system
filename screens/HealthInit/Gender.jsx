import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import femaleIcon from "../../assets/icons/female-icon.png";
import maleIcon from "../../assets/icons/male-icon.png";
import femaleWhiteIcon from "../../assets/icons/female-icon-white.png";
import maleWhiteIcon from "../../assets/icons/male-icon-white.png";
const MALE = "male";
const FEMALE = "female";
export const Gender = ({ updateValue, defaultValue }) => {
  const [selectedGender, setSelectedGender] = useState(defaultValue);
  useEffect(() => {
    updateValue(selectedGender);
  }, [selectedGender]);
  return (
    <View style={styles.container}>
      <Text
        className="text-[18px] font-light text-center mb-[24px]"
        style={Platform.OS === "ios" && styles.iosText}
      >
        What is your gender ?
      </Text>
      <View
        className="flex flex-row mt-[196px] "
        style={Platform.OS === "ios" && styles.iosScrollPicker}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.iconContainer,
              selectedGender === MALE && styles.activeButton,
            ]}
            onPress={() => setSelectedGender(MALE)}
          >
            <Image
              source={selectedGender === MALE ? maleWhiteIcon : maleIcon}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text
            className="text-[18px]"
            style={selectedGender === MALE && styles.activeText}
          >
            Male
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.iconContainer,
              selectedGender === FEMALE && styles.activeButton,
            ]}
            onPress={() => setSelectedGender(FEMALE)}
          >
            <Image
              source={selectedGender === FEMALE ? femaleWhiteIcon : femaleIcon}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text
            className="text-[18px]"
            style={selectedGender === FEMALE && styles.activeText}
          >
            Female
          </Text>
        </View>
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
  iosText: {
    fontSize: 22,
  },
  iosScrollPicker: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#129575",
    marginHorizontal: 30,
    marginVertical: 10,
  },
  icon: {
    width: 60,
    height: 60,
  },
  activeButton: {
    backgroundColor: "#129575",
  },
  activeText: {
    color: "#129575",
  },
});
