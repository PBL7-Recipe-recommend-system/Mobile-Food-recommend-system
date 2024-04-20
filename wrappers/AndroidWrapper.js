import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";

const AndroidWrapper = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default AndroidWrapper;
