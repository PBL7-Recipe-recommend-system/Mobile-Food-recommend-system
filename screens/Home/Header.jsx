import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import defaultAvt from "../../assets/images/avatar.png";
import { Feather } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../constants/color";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Header = () => {
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem("user");
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name);
    };
    fetchUser();
  }, []);
  return (
    <View style={style.headerContainer}>
      <View>
        <View style={style.greeting}>
          <Feather name="sun" size={24} color={PRIMARY_COLOR} />
          <Text className="text-[14px] ml-1">Good Morning</Text>
        </View>
        <Text className="font-extrabold text-2xl text-[#0A2533]">
          {userName ? userName : "User"}
        </Text>
      </View>
      <Image source={defaultAvt} style={style.avt} />
    </View>
  );
};
const style = StyleSheet.create({
  headerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    justifyContent: "space-between",
    paddingHorizontal: 30,
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
});
