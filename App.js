import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./screens/Splash";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import { AppNavigation } from "./navigation/AppNavigation";
import AppWrapper from "./wrappers/AppWrapper";
export default function App() {
  const Stack = createNativeStackNavigator();
  return <AppNavigation />;
}
