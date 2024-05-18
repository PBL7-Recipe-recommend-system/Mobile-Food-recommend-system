import React from "react";
import { Text, TouchableOpacity } from "react-native";
import AppWrapper from "../../wrappers/AppWrapper";
import { logOut } from "../../api/auth";

export const Profile = ({ navigation }) => {
  const handleLogOut = async () => {
    const res = await logOut();
    if (res.status === 200) {
      navigation.navigate("Login");
    } else {
      console.log("Error");
    }
  };
  return (
    <AppWrapper>
      <TouchableOpacity onPress={handleLogOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </AppWrapper>
  );
};
