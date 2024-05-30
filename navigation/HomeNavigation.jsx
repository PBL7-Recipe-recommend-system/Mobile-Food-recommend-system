import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/home/Home";
import { Image } from "react-native";
import homeIcon from "../assets/icons/home.png";
import profileIcon from "../assets/icons/profile.png";
import planIcon from "../assets/icons/plan.png";
import { PlanStackNavigator } from "./PlanStackNavigator";
import { SavedRecipe } from "../screens/saved-recipe/SavedRecipe";
import bookMarkIcon from "../assets/icons/book-mark.png";
import Profile from "../screens/profile/Profile";
import { ProfileStackNavigator } from "./ProfileStackNavigator";

const Tab = createBottomTabNavigator();

export const HomeNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          gestureEnabled: true,
          unmountOnBlur: true,
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
        name="Plan"
        component={PlanStackNavigator}
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          gestureEnabled: false,
          unmountOnBlur: true,
          tabBarIcon: () => (
            <Image
              source={planIcon}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SavedRecipe"
        component={SavedRecipe}
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          gestureEnabled: false,
          unmountOnBlur: true,
          tabBarIcon: () => (
            <Image
              source={bookMarkIcon}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          gestureEnabled: false,
          unmountOnBlur: true,
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
