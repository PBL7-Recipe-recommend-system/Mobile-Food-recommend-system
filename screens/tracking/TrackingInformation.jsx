import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";
import { ScrollView } from "react-native-virtualized-view";
import { getTrackingNutrition } from "../../api/tracking";
import { BackButton } from "../../components/BackButton";
import { TrackingList } from "../../components/tracking/TrackingList";
import { TrackingWaterItem } from "../../components/tracking/TrackingWaterItem";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/color";
import { formatDate, getProgress } from "../../utils/formatData";
import AppWrapper from "../../wrappers/AppWrapper";
import { Loading } from "../../components/Loading";
export const TrackingInformation = () => {
  const [loading, setLoading] = useState(true);
  const [trackingList, setTrackingList] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState("date");
  const [date, setDate] = useState(new Date());
  const [progress, setProgress] = useState(50);
  const options = { day: "numeric", month: "long", weekday: "short" };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await getTrackingNutrition(formatDate(date).toString());
      setTrackingList(res.data);
      setProgress(res.data.totalCalories, res.data.recommendCalories);
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    const get = async () => {
      const res = await getTrackingNutrition(formatDate(date).toString());
      setTrackingList(res.data);
    };
    get();
  }, [date]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowPicker(false);
    setDate(currentDate);
  };
  const MemoizedDateTimePicker = React.memo(DateTimePicker);
  return (
    <AppWrapper>
      <Loading loading={loading} />
      <ScrollView contentContainerStyle={style.container}>
        <View
          style={{
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 50,
            backgroundColor: "#FFFFFF",
            paddingBottom: 30,
          }}
        >
          <View style={style.header}>
            {!showPicker && (
              <>
                <BackButton />
                <Text style={style.headerText}>
                  {date.toLocaleDateString("en-US", options)}
                </Text>
              </>
            )}

            <TouchableOpacity
              style={style.calendarButton}
              onPress={() => setShowPicker(!showPicker)}
            >
              <Ionicons name="calendar" size={24} color="black" />
              {showPicker && (
                <MemoizedDateTimePicker
                  setShowPicker={setShowPicker}
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="inline"
                  onChange={onChange}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: "auto", marginVertical: 28 }}>
            <AnimatedProgressWheel
              max={trackingList.recommendCalories || 100}
              size={180}
              width={16}
              rotation={"-90deg"}
              color={PRIMARY_COLOR}
              labelStyle={style.progressLabel}
              subtitle={"Kcal"}
              progress={trackingList.totalCalories || 0}
              duration={1000}
              backgroundColor={SECONDARY_COLOR}
              showProgressLabel={true}
              rounded={true}
            />
          </View>

          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {trackingList.recommendCalories}
            </Text>
            <Text style={{ fontSize: 22 }}>Kcal goal</Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 30,
          }}
        >
          <TrackingWaterItem
            recommendWaterIntake={trackingList.recommendWaterIntake}
            waterIntake={trackingList.waterIntake}
            date={date}
          />
        </View>
        <View style={style.pseudoHeader}>
          <Text style={style.pseudoHeaderText}>Daily meals</Text>
          <TrackingList dataSource={trackingList} />
        </View>
      </ScrollView>
    </AppWrapper>
  );
};

const style = StyleSheet.create({
  borderWidth: {
    borderWidth: 1,
  },
  container: {
    flexGrow: 1,
    color: "#000",
    backgroundColor: "#F2F5FC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    marginHorizontal: "auto",
  },
  calendarButton: {
    padding: 10,
    borderRadius: 16,
    backgroundColor: "#F2F5FC",
  },
  progressLabel: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
  },
  pseudoHeader: {
    marginHorizontal: 30,
  },
  pseudoHeaderText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "500",
  },
});
