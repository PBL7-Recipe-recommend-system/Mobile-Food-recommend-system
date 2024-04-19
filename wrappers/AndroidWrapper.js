import { StyleSheet, View } from "react-native";

const AndroidWrapper = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default AndroidWrapper;
