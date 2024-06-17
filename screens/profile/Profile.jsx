import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AppWrapper from "../../wrappers/AppWrapper";
import { PRIMARY_COLOR } from "../../constants/color";
import { logOut } from "../../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserFromStorage } from "../../utils/asyncStorageUtils";
import { me } from "../../api/users";
const Profile = ({ navigation }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await me();
      const user = await getUserFromStorage();
      setAvatar(user.avatar);
    };
    fetchData();
  }, []);

  const handleClickEditButton = () => {
    navigation.navigate("EditProfile");
  };

  const handleLogOut = async () => {
    await logOut();
    await AsyncStorage.clear();
    setIsLoggedOut(true);
  };

  useEffect(() => {
    if (isLoggedOut) {
      navigation.navigate("Login");
    }
  }, [isLoggedOut]);
  return (
    <AppWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Profile</Text>
        </View>
        <View style={styles.profileSection}>
          <View>
            <Image
              source={{
                uri: avatar,
              }}
              style={styles.profileImage}
            />
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleClickEditButton}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Favorite")}
          >
            <Text style={styles.itemText}>Favorite</Text>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>History</Text>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Text style={styles.itemText}>Change password</Text>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  avatarBorder: {
    borderWidth: 2,
    width: 124,
    height: 124,
    borderRadius: 62,
  },
  editButton: {
    backgroundColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  item: {
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  header: {
    marginVertical: 20,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    marginHorizontal: "auto",
  },
  menuIcon: {
    position: "absolute",
    right: 0,
  },
});

export default Profile;
