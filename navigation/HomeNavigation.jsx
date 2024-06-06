import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PRIMARY_COLOR } from "../constants/color";
import { Home } from "../screens/home/Home";
import { SavedRecipe } from "../screens/saved-recipe/SavedRecipe";
import { PlanStackNavigator } from "./PlanStackNavigator";
import { ProfileStackNavigator } from "./ProfileStackNavigator";
import { TrackingInformation } from "../screens/tracking/TrackingInformation";
const Tab = createBottomTabNavigator();

export const HomeNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { borderWidth: 1, borderRadius: 20, borderColor: "white" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "",
          tabBarHideOnKeyboard: true,
          headerShown: false,
          gestureEnabled: true,
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? PRIMARY_COLOR : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Plan"
        component={PlanStackNavigator}
        options={{
          tabBarLabel: "",
          tabBarHideOnKeyboard: true,
          headerShown: false,
          gestureEnabled: false,
          unmountOnBlur: true,

          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="profile"
              size={24}
              color={focused ? PRIMARY_COLOR : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TrackingInformation"
        component={TrackingInformation}
        options={{
          tabBarLabel: "",
          tabBarHideOnKeyboard: true,
          headerShown: false,
          gestureEnabled: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="dashboard"
              size={24}
              color={focused ? PRIMARY_COLOR : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: "",
          tabBarHideOnKeyboard: true,
          headerShown: false,
          gestureEnabled: false,
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={24}
              color={focused ? PRIMARY_COLOR : "black"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
