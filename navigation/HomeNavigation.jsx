import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/home/Home";
import { Profile } from "./../screens/home/Profile";
import { Image } from "react-native";
import homeIcon from "../assets/icons/home.png";
import profileIcon from "../assets/icons/profile.png";

const Tab = createBottomTabNavigator();

export const HomeNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          gestureEnabled: false,
          tabBarIcon: () => (
            <Image
              source={homeIcon}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          gestureEnabled: false,
          tabBarIcon: () => (
            <Image
              source={profileIcon}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
