import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "../screens/profile/Profile";
import { EditProfile } from "../screens/profile/EditProfile";
import { ChangePassword } from "../screens/profile/ChangePassword";
import { SavedRecipe } from "../screens/saved-recipe/SavedRecipe";
import { Ingredients } from "../screens/profile/Ingredients";

const ProfileStack = createNativeStackNavigator();
export const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator initialRouteName="PlanStack">
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="Favorite"
        component={SavedRecipe}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="Ingredients"
        component={Ingredients}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};
