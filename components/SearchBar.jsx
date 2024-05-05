import React, { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
export const SearchBar = ({ openSearchPage }) => {
  const [value, setValue] = useState("");
  return (
    <View
      style={{
        width: "80%",
        marginVertical: 24,
      }}
    >
      <View
        style={{
          borderWidth: 2,
          borderRadius: 16,
          borderColor: "#E5E5E5",
          width: "100%",
          height: 50,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginLeft: 10,
          }}
        >
          <AntDesign name="search1" size={24} color="#E5E5E5" />
          <TouchableOpacity style={{ width: "100%" }} onPress={openSearchPage}>
            <TextInput
              editable
              numberOfLines={1}
              placeholder="Search recipe"
              maxLength={40}
              onChangeText={(text) => onChangeText(text)}
              value={value}
              height={46}
              style={{ paddingLeft: 10, width: "90%" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({});
