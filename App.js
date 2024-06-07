import { PaperProvider } from "react-native-paper";
import { AppNavigation } from "./navigation/AppNavigation";
import { Root as PopupRootProvider } from "react-native-popup-confirm-toast";
export default function App() {
  return (
    <PaperProvider>
      <PopupRootProvider>
        <AppNavigation />
      </PopupRootProvider>
    </PaperProvider>
  );
}
