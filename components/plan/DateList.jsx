import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { DateItem } from "./DateItem";
import { SECONDARY_COLOR } from "../../constants/color";

export const DateList = () => {
  const [active, setActive] = useState("13 Tue");
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={style.container}
    >
      <DateItem value={"13 Tue"} active={true} />
      <DateItem value={"14 Wed"} />
      <DateItem value={"15 Thu"} />
      <DateItem value={"16 Fri"} />
      <DateItem value={"17 Sat"} />
      <DateItem value={"18 Sun"} />
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginLeft: 22,
    paddingVertical: 10,
  },
});
