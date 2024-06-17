import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PRIMARY_COLOR } from "../../constants/color";
import { formatDate, formatWaterValue, isToday } from "../../utils/formatData";
import { setWaterIntake } from "../../api/tracking";
import { AntDesign } from "@expo/vector-icons";
export const TrackingWaterItem = ({
  recommendWaterIntake,
  waterIntake,
  date,
}) => {
  const [water, setWater] = useState(waterIntake);

  const handleModify = async (type) => {
    if (typeof water === "number") {
      let result;
      if (type === "add") {
        result = Math.round((water + 0.1) * 10) / 10;
      } else {
        result = Math.round((water - 0.1) * 10) / 10;
      }
      setWater(result);
      await setWaterIntake(formatDate(new Date()), result);
    } else {
    }
  };
  return (
    <View style={style.done}>
      <View style={style.container}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            marginHorizontal: 20,
            height: "100%",
            width: "50%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                color: "#4166F5",
                marginRight: 10,
                fontSize: 22,
                fontWeight: "500",
              }}
            >
              Water
            </Text>
            {water >= recommendWaterIntake && (
              <AntDesign name="checkcircleo" size={24} color="#00FF00" />
            )}
          </View>
          <Text
            style={{
              color: "#9DA8C3",
              fontSize: 14,
            }}
          >
            Until now {recommendWaterIntake}L
          </Text>
        </View>
        <View style={style.rightContent}>
          {isToday(date) && (
            <TouchableOpacity
              style={style.modifyButton}
              onPress={() => handleModify("desc")}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                -
              </Text>
            </TouchableOpacity>
          )}
          <Text
            style={{
              marginHorizontal: 10,
              fontSize: 14,
              color: "#9DA8C3",
              width: 33,
            }}
          >
            {formatWaterValue(water) || 0} L
          </Text>
          {isToday(date) && (
            <TouchableOpacity
              style={style.modifyButton}
              onPress={() => handleModify("add")}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: 72,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 12,
    borderLeftWidth: 10,
    marginRight: 10,
    borderColor: PRIMARY_COLOR,
  },
  modifyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20,
  },
  done: {
    marginVertical: 16,
  },
});
