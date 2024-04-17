import { Text, View, StyleSheet } from "react-native";
const Login = () => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    textAlign: "center",
    alignItems: "center",
  },
});

export default Login;
