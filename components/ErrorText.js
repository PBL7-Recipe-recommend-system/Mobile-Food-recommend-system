import React from "react";
import { View, Text } from "react-native";

const ErrorText = ({ isValid, message }) => {
  return (
    <View>
      <Text
        style={[isValid ? { color: "#fff" } : { color: "red" }]}
        className="mt-1 ml-1"
      >
        {message}
      </Text>
    </View>
  );
};

export default ErrorText;
