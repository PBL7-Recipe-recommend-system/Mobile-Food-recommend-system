import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Root } from "react-native-popup-confirm-toast";
import { getMealPlan } from "../../api/plan";
import { getTrackingNutrition } from "../../api/tracking";
import { Loading } from "../../components/Loading";
import { InitPlan } from "../../components/plan/InitPlan";
import { PlanMeal } from "../../components/plan/PlanMeal";
import { TabMenu } from "../../components/plan/TabMenu";
import { CustomHeader } from "../../components/search/CustomHeader";
import { CUSTOM_TAB, RECOMMEND_TAB } from "../../constants/plan";
import { setDateAddingToStorage } from "../../utils/asyncStorageUtils";
import { formatDate } from "../../utils/formatData";
import AppWrapper from "../../wrappers/AppWrapper";
import { KeyboardWrapper } from "../../wrappers/KeyboardWrapper";

export const Plan = () => {
  const [tabValue, setTabValue] = useState(RECOMMEND_TAB);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userString = await AsyncStorage.getItem("user");
      await getTrackingNutrition(formatDate(new Date()));
      const currentUser = JSON.parse(userString);
      if (JSON.stringify(user) !== JSON.stringify(currentUser)) {
        setUser(currentUser);
      }
      await setDateAddingToStorage(formatDate(new Date()));
      if (currentUser.isCustomPlan === true) {
        await getMealPlan();
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <AppWrapper>
      <Loading loading={loading} />
      <KeyboardWrapper>
        <Root>
          <Loading loading={loading} />
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
              <CustomHeader title="Meal Planning" />
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
        </Root>
      </KeyboardWrapper>
    </AppWrapper>
  );
};

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
