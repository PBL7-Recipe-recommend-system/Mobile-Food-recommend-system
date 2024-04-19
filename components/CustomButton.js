import { StyleSheet, Text, TouchableHighlight } from "react-native";

const CustomButton = ({ title, onPressButton, width, height, customStyle }) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#71B1A1"
      style={[styles.button, { width: width, height: height }, customStyle]}
      onPress={onPressButton}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#129575",
    borderRadius: 10,
    marginVertical: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
  },
});
export default CustomButton;
