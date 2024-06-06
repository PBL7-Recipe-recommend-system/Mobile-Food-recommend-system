import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatDate, toDate } from "../utils/formatData";
export const CustomDateTimePicker = ({
  showPicker,
  setShowPicker,
  defaultValue,
  setDefaultValue,
  display,
}) => {
  const [date, setDate] = useState(toDate(defaultValue));
  const [selectedDate, setSelectedDate] = useState(null);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(showPicker);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDefaultValue(formatDate(currentDate));
    setSelectedDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setShowPicker(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          {
            fontSize: 16,
            color: "#676767",
          },
          show && { display: "none" },
        ]}
      >
        {date && date.toLocaleDateString()}
      </Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display={display ? display : "spinner"}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <TouchableOpacity
        onPress={showDatepicker}
        style={show && { display: "none" }}
      >
        <AntDesign name="calendar" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#A9A9A9",
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
