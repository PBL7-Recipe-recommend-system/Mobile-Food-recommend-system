import { Platform, ToastAndroid, Alert } from "react-native";

export const showErrorToast = (message, type) => {
  if (Platform.OS === "ios") {
    Alert.alert("Error", message);
  } else {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  }
};
