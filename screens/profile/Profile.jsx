import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AppWrapper from "../../wrappers/AppWrapper";
import { Entypo } from "@expo/vector-icons";
import avatarImg from "../../assets/mock/avatar.jpg";
export const Profile = () => {
  return (
    <AppWrapper>
      <View style={style.container}>
        <View style={style.header}>
          <Text style={style.textHeader}>Profile</Text>
          <Entypo
            name="dots-three-horizontal"
            size={24}
            color={"#000"}
            style={style.menuIcon}
          />
        </View>
        <View style={style.personalize}>
          <Image source={avatarImg} style={style.image} />
          <View className="flex flex-col justify-between" style={{ flex: 1 }}>
            <Text className="font-bold text-[18px]">Travis</Text>
            <View
              className="flex flex-row justify-between"
              style={{ flex: 1, marginTop: "10%" }}
            >
              <Text className="text-[16px]">Gender: Male</Text>
              <Text className="text-[16px]">Age: Male</Text>
            </View>
          </View>
        </View>
      </View>
    </AppWrapper>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  header: {
    marginVertical: 20,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  menuIcon: {
    position: "absolute",
    right: 0,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: "4%",
  },
  personalize: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
});
