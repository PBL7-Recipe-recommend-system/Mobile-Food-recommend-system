import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Plan } from "../screens/plan/Plan";
import { Search } from "../screens/home/Search";
const PlanStack = createNativeStackNavigator();
export const PlanStackNavigator = () => {
  return (
    <PlanStack.Navigator initialRouteName="PlanStack">
      <PlanStack.Screen
        name="PlanStack"
        component={Plan}
        options={{ headerShown: false }}
      />
      <PlanStack.Screen
        name="SearchFood"
        component={Search}
        options={{ headerShown: false }}
      />
    </PlanStack.Navigator>
  );
};
