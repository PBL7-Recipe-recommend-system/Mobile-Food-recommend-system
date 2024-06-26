import { PaperProvider } from "react-native-paper";
import { AppNavigation } from "./navigation/AppNavigation";
import { Root as PopupRootProvider } from "react-native-popup-confirm-toast";
import Toast from "react-native-toast-message";
export default function App() {
  return (
    <PaperProvider>
      <PopupRootProvider>
        <AppNavigation />
        <Toast topOffset={100} />
      </PopupRootProvider>
    </PaperProvider>
  );
}
