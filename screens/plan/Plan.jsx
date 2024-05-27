import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { PlanMeal } from "../../components/plan/PlanMeal";
import { TabMenu } from "../../components/plan/TabMenu";
import { CustomHeader } from "../../components/search/CustomHeader";
import AppWrapper from "../../wrappers/AppWrapper";
import { KeyboardWrapper } from "../../wrappers/KeyboardWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InitPlan } from "../../components/plan/InitPlan";
import { RECOMMEND_TAB, CUSTOM_TAB } from "../../constants/plan";

export const Plan = () => {
  const [tabValue, setTabValue] = useState(RECOMMEND_TAB);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const userString = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(userString);
      if (JSON.stringify(user) !== JSON.stringify(currentUser)) {
        setUser(currentUser);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [user]);
  return (
    <AppWrapper>
      <KeyboardWrapper>
        <ScrollView
          contentContainerStyle={style.container}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              width: "100%",
              paddingHorizontal: 30,
              paddingBottom: 10,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <CustomHeader title="Plan Meal" />
            <TabMenu tabValue={tabValue} handleChangeTab={setTabValue} />
          </View>
          {tabValue === RECOMMEND_TAB ? (
            <PlanMeal planType={RECOMMEND_TAB} />
          ) : (
            <View style={{ width: "100%" }}>
              {user.isCustomPlan ? (
                <PlanMeal planType={CUSTOM_TAB} />
              ) : (
                <InitPlan />
              )}
            </View>
          )}
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
