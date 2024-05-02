import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

export const NextButton = ({ percentage, onPress, navigation, disabled }) => {
  const size = 86;
  const strokewidth = 4;
  const center = size / 2;
  const radius = size / 2 - strokewidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    const listener = progressAnimation.addListener((value) => {
      const isFinished = value.value === 100;
      setIsComplete(isFinished);
      if (isFinished) {
        setTimeout(() => {
          // navigation.navigate("Login");
        }, 500);
      }
      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset: circumference - (circumference * value.value) / 100,
        });
      }
    });

    return () => {
      progressAnimation.removeListener(listener);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} fill="white">
        <G rotation="-90" origin={center}>
          <Circle
            stroke="#E6E7E8"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokewidth}
          />
          <Circle
            ref={progressRef}
            stroke={disabled ? "rgba(18, 149, 117, 0.5)" : "#129575"}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokewidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * 25) / 100}
          />
        </G>
      </Svg>
      <TouchableOpacity
        style={[styles.button, disabled && styles.disabled]}
        activeOpacity={0.6}
        onPress={onPress}
        disabled={disabled}
      >
        {isComplete ? (
          <AntDesign name="check" size={24} color="#fff" />
        ) : (
          <AntDesign name="right" size={24} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: 100,
  },
  button: {
    position: "absolute",
    backgroundColor: "#129575",
    padding: 20,
    borderRadius: 100,
  },
  disabled: {
    opacity: 0.5,
  },
});
