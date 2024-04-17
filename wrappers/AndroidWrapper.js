import { Children } from "react";
import { StyleSheet, View } from "react-native";
const AndroidWrapper = () => {
  return <View style={styles.container}>{Children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});
export default AndroidWrapper;
