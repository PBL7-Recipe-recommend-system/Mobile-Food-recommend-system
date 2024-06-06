import { PaperProvider } from "react-native-paper";
import { AppNavigation } from "./navigation/AppNavigation";
export default function App() {
  return (
    <PaperProvider>
      <AppNavigation />
    </PaperProvider>
  );
}
