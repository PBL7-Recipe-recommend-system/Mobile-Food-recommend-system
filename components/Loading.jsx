import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { PRIMARY_COLOR } from "../constants/color";

export const Loading = ({ loading }) => {
  return (
    <Spinner
      visible={loading}
      textStyle={{ color: "#000" }}
      color={PRIMARY_COLOR}
      overlayColor="rgba(0, 0, 0, 0.5)"
    />
  );
};
