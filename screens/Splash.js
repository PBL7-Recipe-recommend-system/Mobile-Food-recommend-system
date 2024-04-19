import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import image from "../assets/images/splash.jpg";
import logo from "../assets/images/logo.png";
import CustomButton from "../components/CustomButton";
const Splash = ({ navigation }) => {
  const onPressButton = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Image source={logo}></Image>
          <Text className="text-2xl" style={{ color: "#fff" }}>
            100K+ Tasty Recipe
          </Text>
        </View>
        <View style={[styles.content]}>
          <Text
            className="text-[50px] font-semibold text-center mb-3"
            style={{ color: "#fff" }}
          >
            Get{"\n"}Cooking
          </Text>
          <Text
            className="text-center text-[16px] leading-6"
            style={{ color: "#fff" }}
          >
            Simple way to findTasty Recipe
          </Text>
        </View>
        <CustomButton
          title="Start Cooking"
          onPressButton={onPressButton}
          width={243}
          height={54}
          customStyle={styles.button}
        ></CustomButton>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  title: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    top: "80%",
  },
});
export default Splash;
