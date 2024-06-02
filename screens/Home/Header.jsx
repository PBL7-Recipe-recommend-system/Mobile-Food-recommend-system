import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import defaultAvt from "../../assets/images/avatar.png";
import { Feather } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../constants/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getGreeting } from "../../utils/formatData";

export const Header = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem("user");
      const parsedUser = JSON.parse(user);
      console.log(parsedUser);
      setUser(parsedUser);
    };
    fetchUser();
  }, []);
  return (
    <View style={style.headerContainer}>
      <View>
        <View style={style.greeting}>
          <Feather name="sun" size={24} color={PRIMARY_COLOR} />
          <Text className="text-[14px] ml-1">{getGreeting()}</Text>
        </View>
        <Text className="font-extrabold text-2xl text-[#0A2533]">
          {user ? user.name : "User"}
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
