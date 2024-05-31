import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { PRIMARY_COLOR } from "../constants/color";

const CustomButton = ({
  title,
  onPressButton,
  width,
  height,
  customStyle,
  disabled,
  textColor,
}) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#71B1A1"
      style={[
        styles.button,
        { width: width, height: height },
        customStyle,
        disabled && styles.disabled,
      ]}
      onPress={onPressButton}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: textColor || "#fff" }]}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    marginVertical: 8,
    zIndex: 0,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
  },
  disabled: {
    backgroundColor: "#71B1A1",
  },
});
export default CustomButton;
