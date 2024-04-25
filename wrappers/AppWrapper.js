import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { KeyboardWrapper } from "./KeyboardWrapper";
const AppWrapper = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <KeyboardWrapper>{children}</KeyboardWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#000",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default AppWrapper;
