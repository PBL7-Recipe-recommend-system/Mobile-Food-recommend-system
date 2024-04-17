import { StyleSheet, Text, TouchableHighlight } from "react-native";

const CustomButton = ({ title, onPressButton }) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#71B1A1"
      style={styles.button}
      onPress={onPressButton}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 243,
    height: 54,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    backgroundColor: "#129575",
    borderRadius: 10,
    position: "absolute",
    top: "80%",
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
  },
});
export default CustomButton;
