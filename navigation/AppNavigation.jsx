import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "../screens/Splash";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import { HealthStepForm } from "../screens/healthInit/HealthStepForm";
import { ForgotPassword } from "./../screens/auth/ForgotPassword";
import { ResetPassword } from "./../screens/auth/ResetPassword";
import { HomeNavigation } from "./HomeNavigation";
import OPTInput from "../screens/auth/OPTInput";
import { DetailedRecipe } from "../screens/recipes/DetailedRecipe";
import { SavedRecipe } from "../screens/saved-recipe/SavedRecipe";
export const AppNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Start"
          component={Splash}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="OPTInput"
          component={OPTInput}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="HealthStepForm"
          component={HealthStepForm}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="HomeNavigation"
          component={HomeNavigation}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="DetailedRecipe"
          component={DetailedRecipe}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
