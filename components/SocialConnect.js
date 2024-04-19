import { View, Text, Image, StyleSheet } from "react-native";
import google from "../assets/icons/google.png";
import facebook from "../assets/icons/facebook.png";

const SocialConnect = () => {
  return (
    <View className="flex-auto">
      <View style={styles.divider}>
        <View style={[styles.line, { marginLeft: 40 }]}></View>
        <Text style={styles.text}>Or Sign In With</Text>
        <View style={[styles.line, { marginRight: 40 }]}></View>
      </View>

      <View className="flex-auto flex flex-row items-start justify-center ">
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={google}></Image>
        </View>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={facebook}></Image>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D9D9D9",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 11,
    color: "#D9D9D9",
    fontWeight: "bold",
    marginHorizontal: 12,
  },
  iconContainer: {
    height: 44,
    width: 44,
    borderColor: "#fff",
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
    marginHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 32,
    height: 32,
  },
});
export default SocialConnect;
