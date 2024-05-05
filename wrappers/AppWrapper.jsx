import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const AppWrapper = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#fff", "#fafafa"]}
        style={{ height: "100%", width: "100%" }}
      >
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        {children}
      </LinearGradient>
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
