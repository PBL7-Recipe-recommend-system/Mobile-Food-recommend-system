import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "../screens/Splash";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import { HealthStepForm } from "../screens/HealthInit/HealthStepForm";
import { ForgotPassword } from "./../screens/auth/ForgotPassword";
import { ResetPassword } from "./../screens/auth/ResetPassword";
export const AppNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
