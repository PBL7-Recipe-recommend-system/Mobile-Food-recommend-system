import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { PlanMeal } from "../../components/plan/PlanMeal";
import { TabMenu } from "../../components/plan/TabMenu";
import { CustomHeader } from "../../components/search/CustomHeader";
import AppWrapper from "../../wrappers/AppWrapper";
import { KeyboardWrapper } from "../../wrappers/KeyboardWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Plan = () => {
  const user = AsyncStorage.getItem("user");
  useEffect(() => {
    const fetchData = async () => {
      user = await AsyncStorage.getItem("user");
      console.log(user);
    };
    fetchData();
  }, []);
  return (
    <AppWrapper>
      <KeyboardWrapper>
        <ScrollView
          contentContainerStyle={style.container}
          stickyHeaderIndices={[0]}
        >
          <View
            style={{
              width: "100%",
              paddingHorizontal: 30,
              paddingBottom: 10,
              backgroundColor: "#fff",
            }}
          >
            <CustomHeader title="Plan Meal" />
            <TabMenu />
          </View>

          {/* <View style={{ height: "100%" }}>
            <InitPlan />
          </View> */}
          <View style={{ width: "100%" }}>
            <PlanMeal />
          </View>
        </ScrollView>
      </KeyboardWrapper>
    </AppWrapper>
  );
};

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
