import Checkbox from "expo-checkbox";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";

export const HealthInputItem = ({ selected, title, desc, onSelect }) => {
  const handlePress = () => {
    onSelect(!selected);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View>
        <Text style={Platform.OS === "ios" && styles.title}>{title}</Text>
        <Text style={[styles.desc, Platform.OS === "ios" && styles.iosDesc]}>
          {desc}
        </Text>
      </View>
      <View>
        <Checkbox
          disabled={false}
          value={selected}
          className="rounded-full ml-1"
          onValueChange={onSelect}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#E5E5E5",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  title: {
    fontSize: 18,
  },
  desc: {
    color: "#828997",
    marginVertical: 4,
  },
  iosDesc: {
    fontSize: 16,
  },
});
